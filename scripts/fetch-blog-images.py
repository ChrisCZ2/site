#!/usr/bin/env python3
"""Download writeup images locally and rewrite MDX paths. Run: npm run images:blog"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
WRITEUPS = ROOT / "src/content/writeups"
OUT_BASE = ROOT / "public/media/blog"

IMAGE_URL_RE = re.compile(
    r"(?:coverImage:\s*['\"](?P<cover>[^'\"]+)['\"]|!\[[^\]]*\]\((?P<md>[^)]+)\))"
)
SKIP_IN_URL = ("portswigger.net", "owasp.org")


def is_image_url(url: str) -> bool:
    return url.startswith("http") and not any(s in url for s in SKIP_IN_URL)


def resolve_source(url: str) -> str:
    if "gitbook.io/~gitbook/image" in url:
        parsed = urlparse(url)
        inner = parse_qs(parsed.query).get("url", [None])[0]
        if inner:
            return unquote(inner)
    return url.split("?")[0]


def wp_relative(url: str) -> Path | None:
    """Map chriscz.com/wp-content/uploads/... to a stable local path."""
    m = re.search(r"/wp-content/uploads/(.+)$", resolve_source(url))
    if m:
        return Path("chriscz") / m.group(1)
    return None


def local_dest(url: str, slug: str, role: str, index: int) -> Path:
    rel = wp_relative(url)
    if rel:
        return OUT_BASE / rel
    name = Path(unquote(urlparse(resolve_source(url)).path)).name or "image.png"
    name = re.sub(r"[^\w.\-]", "-", name)
    if role == "cover":
        return OUT_BASE / slug / f"cover-{name}"
    return OUT_BASE / slug / f"{index:02d}-{name}"


def ext_from(url: str, content_type: str | None) -> str:
    suffix = Path(urlparse(url).path).suffix.lower()
    if suffix in {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"}:
        return suffix
    if content_type:
        for mime, ext in (
            ("png", ".png"),
            ("jpeg", ".jpg"),
            ("webp", ".webp"),
            ("gif", ".gif"),
        ):
            if mime in content_type:
                return ext
    return ".png"


def download(url: str, dest: Path) -> Path | None:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; chriscz-portfolio/1.0)",
        "Accept": "image/*,*/*",
    }
    errors: list[str] = []
    candidates = [url]
    inner = resolve_source(url)
    if inner != url.split("?")[0]:
        candidates.append(inner)

    for attempt_url in candidates:
        try:
            req = Request(attempt_url, headers=headers)
            with urlopen(req, timeout=60) as resp:
                data = resp.read()
                if len(data) < 200 and b"<html" in data[:800].lower():
                    errors.append(f"{attempt_url}: html response")
                    continue
                ext = ext_from(attempt_url, resp.headers.get("Content-Type"))
                out = dest if dest.suffix else dest.with_suffix(ext)
                if out.suffix.lower() not in {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"}:
                    out = out.with_suffix(ext)
                out.parent.mkdir(parents=True, exist_ok=True)
                out.write_bytes(data)
                return out
        except Exception as exc:
            errors.append(f"{attempt_url}: {exc}")

    print(f"  FAIL {url}\n    " + "\n    ".join(errors), file=sys.stderr)
    return None


# Global cache: canonical URL -> public path
CACHE: dict[str, str] = {}


def public_url(file_path: Path) -> str:
    return "/" + file_path.relative_to(ROOT / "public").as_posix()


def ensure_local(url: str, slug: str, role: str, index: int) -> str | None:
    canon = resolve_source(url)
    if canon in CACHE:
        return CACHE[canon]

    dest = local_dest(url, slug, role, index)
    if dest.exists() and dest.stat().st_size > 200:
        rel = public_url(dest)
        CACHE[canon] = rel
        return rel

    saved = download(url, dest)
    if not saved:
        return None
    rel = public_url(saved)
    CACHE[canon] = rel
    return rel


def rewrite_text(text: str, mapping: dict[str, str]) -> str:
    out = text
    for old, new in sorted(mapping.items(), key=lambda kv: -len(kv[0])):
        out = out.replace(old, new)
    for old, new in mapping.items():
        base = old.split("?")[0]
        if "?" in old or base != old:
            out = re.sub(re.escape(base) + r"\?[^)\s'\"]+", new, out)
    return out


def process_mdx(path: Path) -> int:
    slug = path.stem
    text = path.read_text(encoding="utf-8")
    mapping: dict[str, str] = {}
    inline_idx = 0
    ok = 0

    for m in IMAGE_URL_RE.finditer(text):
        url = (m.group("cover") or m.group("md") or "").strip()
        if not is_image_url(url):
            continue
        role = "cover" if m.group("cover") else "inline"
        if role == "inline":
            inline_idx += 1
        local = ensure_local(url, slug, role, inline_idx)
        if local:
            mapping[url] = local
            ok += 1

    if not mapping:
        return 0

    new_text = rewrite_text(text, mapping)
    if new_text != text:
        path.write_text(new_text, encoding="utf-8")
        print(f"  {slug}: {len(mapping)} refs → local")
    return ok


def main() -> None:
    total = 0
    for mdx in sorted(WRITEUPS.glob("*.mdx")):
        print(mdx.stem)
        total += process_mdx(mdx)
    print(f"\nDone — {total} image references, {len(CACHE)} unique files in public/media/blog/")


if __name__ == "__main__":
    main()
