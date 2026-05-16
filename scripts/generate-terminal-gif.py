#!/usr/bin/env python3
"""Regenerate public/media/gifs/terminal-exploit.gif — run: npm run gif:terminal"""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/media/gifs/terminal-exploit.gif"

W, H = 800, 340
PAD_X, PAD_Y = 28, 24
LINE_H = 22
LN_X = PAD_X
CODE_X = PAD_X + 28

# Match src/styles/global.css .home-terminal syntax + --surface background
BG = (5, 38, 54)  # --surface #052636
LN = (80, 138, 168)  # .ln / --steel
KW = (192, 132, 252)  # .kw
ID = (157, 209, 241)  # .id / --highlight
STR = (74, 222, 128)  # .str / --good
NUM = (251, 191, 36)  # .num / --warn
CM = (80, 138, 168)  # .cm
FN = (103, 232, 249)  # .fn
TEXT = (255, 255, 255)

HANDLE = "chriscz"
WRITEUPS = "7"

Segment = tuple[str, tuple[int, int, int]]
Line = list[Segment] | None

CODE_LINES: list[Line] = [
    [
        ("import", KW),
        (" ", TEXT),
        ("Target", ID),
        (" ", TEXT),
        ("from", KW),
        (" ", TEXT),
        ("'reality'", STR),
    ],
    [
        ("const", KW),
        (" ", TEXT),
        ("hunter", ID),
        (" = ", TEXT),
        ("new", KW),
        (" ", TEXT),
        ("BugHunter", FN),
        ("({", TEXT),
    ],
    [
        ("  ", TEXT),
        ("handle", ID),
        (": ", TEXT),
        (f"'{HANDLE}'", STR),
        (",", TEXT),
    ],
    [
        ("  ", TEXT),
        ("skill", ID),
        (": ", TEXT),
        ("'appsec'", STR),
        (",", TEXT),
    ],
    [
        ("  ", TEXT),
        ("writeups", ID),
        (": ", TEXT),
        (WRITEUPS, NUM),
        (",", TEXT),
    ],
    [
        ("  ", TEXT),
        ("disclosure", ID),
        (": ", TEXT),
        ("'responsible'", STR),
    ],
    [("});", TEXT)],
    None,
    [("// SQLi · IDOR · BOLA · SSRF · XSS", CM)],
    [
        ("await", KW),
        (" ", TEXT),
        ("hunter", ID),
        (".", TEXT),
        ("pwn", FN),
        ("([", TEXT),
        ("'...in-scope'", STR),
        ("]);", TEXT),
    ],
    [
        ("console", ID),
        (".", TEXT),
        ("log", FN),
        ('("Writeups live on chriscz.com");', STR),
    ],
]


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in (
        "/System/Library/Fonts/Menlo.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf",
    ):
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def draw_segments(
    draw: ImageDraw.ImageDraw,
    x: float,
    y: int,
    segments: list[Segment],
    font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
) -> float:
    for text, color in segments:
        draw.text((x, y), text, fill=color, font=font)
        x += draw.textlength(text, font=font)
    return x


def frame(count: int, font, font_ln) -> Image.Image:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    y = PAD_Y
    for i, line in enumerate(CODE_LINES):
        if i >= count:
            break
        if line is None:
            y += LINE_H
            continue
        draw.text((LN_X, y), str(i + 1).rjust(2), fill=LN, font=font_ln)
        end_x = draw_segments(draw, CODE_X, y, line, font)
        if count == len(CODE_LINES) and i == len(CODE_LINES) - 1:
            draw.rectangle([int(end_x) + 4, y, int(end_x) + 12, y + LINE_H - 6], fill=FN)
        y += LINE_H
    return img


def main() -> None:
    font = load_font(13)
    font_ln = load_font(12)
    frames = [frame(n, font, font_ln) for n in range(1, len(CODE_LINES) + 1)]
    OUT.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=450,
        loop=0,
        optimize=True,
    )
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
