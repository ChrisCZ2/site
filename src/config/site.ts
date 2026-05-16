export const site = {
  name: 'chriscz',
  title: 'chriscz — Main place about my writeups as a hacker',
  description: 'Main place about my writeups as a hacker',
  url: 'https://chriscz.com',
  handle: 'chriscz',
  tagline: 'Main place about my writeups as a hacker',
  email: 'security@chriscz.com',
  pgpFingerprint: 'XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX',
  stats: {
    reports: 7,
    highCritical: 5,
    programs: 4,
  },
  links: {
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com',
    hackerone: 'https://hackerone.com',
    bugcrowd: 'https://bugcrowd.com',
    twitter: 'https://x.com',
  },
  skills: [
    'Web app pentesting',
    'API security',
    'IDOR / BOLA',
    'SQL injection',
    'SSRF',
    'XSS',
    'CTF writeups',
  ],
  about: `I am a dedicated Web Application Penetration Tester, combining hands-on experience with a strong desire to keep learning and growing in the field. As a beginner pentester, I constantly build on my skills through certifications, workshops, and real-world projects — learning new tools, techniques, and vulnerabilities, and applying this knowledge to different pentesting scenarios.

With each engagement, I provide detailed reports and remediation steps, helping clients understand and address critical security issues. In my spare time I love going to the gym, playing video games, and enjoying time with family. I'm passionate about cybersecurity and committed to staying updated on the latest trends in the industry.`,
} as const;

export const tools = [
  {
    name: 'recongx',
    description: 'Lightweight subdomain & endpoint enumerator with JSON output for pipelines.',
    lang: 'Go',
    href: '#',
  },
  {
    name: 'param-diff',
    description: 'Compare authenticated vs unauthenticated responses to spot access-control gaps.',
    lang: 'Python',
    href: '#',
  },
  {
    name: 'scope-watch',
    description: 'Monitor in-scope asset changes from program policy pages and DNS.',
    lang: 'Shell',
    href: '#',
  },
] as const;

export const hallOfFame = [
  {
    program: 'PortSwigger Labs',
    severity: 'high' as const,
    title: 'SQL injection UNION — multi-value extraction',
    year: '2025',
  },
  {
    program: 'PortSwigger Labs',
    severity: 'high' as const,
    title: 'IDOR — account enumeration via parameter',
    year: '2025',
  },
  {
    program: 'NahamCon CTF 2025',
    severity: 'medium' as const,
    title: 'Advanced Screening',
    year: '2025',
  },
  {
    program: 'PortSwigger Labs',
    severity: 'high' as const,
    title: 'BOLA — broken object level authorization',
    year: '2024',
  },
] as const;
