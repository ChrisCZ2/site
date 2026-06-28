/**
 * Edit this file to add/remove nav links — Header, Footer, and mobile CTAs read from here.
 */
import { site } from './site';

export type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

export const mainNav: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Work' },
  { href: '/fitness', label: 'Fitness / Life' },
  { href: '/web-app-security', label: 'Web App' },
  { href: '/api-secuirty', label: 'API Security' },
  { href: '/cloud-security', label: 'Cloud' },
  { href: '/ctfs', label: 'CTFs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const headerCta: NavLink[] = [
  { href: '/blog', label: 'Writeups' },
  { href: '/about', label: 'About' },
];

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: 'Research',
    links: [
      { href: '/blog', label: 'Work' },
      { href: '/fitness', label: 'Fitness / life' },
      { href: '/web-app-security', label: 'Web app pentesting' },
      { href: '/api-secuirty', label: 'API security' },
      { href: '/cloud-security', label: 'Cloud pentesting' },
      { href: '/ctfs', label: 'CTFs' },
    ],
  },
  {
    title: 'Links',
    links: [
      { href: site.links.github, label: 'GitHub', external: true },
      { href: site.links.linkedin, label: 'LinkedIn', external: true },
      { href: site.links.hackerone, label: 'HackerOne', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/.well-known/security.txt', label: 'security.txt' },
    ],
  },
];
