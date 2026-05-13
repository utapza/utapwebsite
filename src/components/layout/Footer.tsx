import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';
import { Logo } from '../ui/Logo';

const columns = [
  {
    title: 'Product',
    links: [
      { to: '/students', label: 'For students' },
      { to: '/vendors', label: 'For vendors' },
      { to: '/universities', label: 'For universities' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/blog', label: 'Blog' },
      { to: '/press', label: 'Press' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/legal/terms', label: 'Terms' },
      { to: '/legal/privacy', label: 'Privacy' },
      { to: '/legal/refunds', label: 'Refunds' },
    ],
  },
  {
    title: 'Get in touch',
    links: [
      { to: '/help', label: 'Help centre' },
      { to: '/contact', label: 'Send a message' },
    ],
  },
];

const socials = [
  { href: 'https://www.instagram.com/utap.tech', label: 'Instagram', icon: Instagram },
  { href: 'https://x.com/utap_tech', label: 'X / Twitter', icon: Twitter },
  { href: 'https://www.linkedin.com/company/utap-tech', label: 'LinkedIn', icon: Linkedin },
  { href: 'mailto:hello@utaptech.co.za', label: 'Email', icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-ink-muted leading-relaxed">
              Tap into your campus, order from trusted vendors, and show up to games and events — all in one app.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-muted border border-slate-200 transition-colors duration-200 ease-out-soft hover:text-brand-700 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-ink mb-3">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-ink-muted hover:text-brand-700 transition-colors duration-200"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-ink-muted">
          <p>© {year} uTap Technologies. Built for South African campuses.</p>
          <p>
            Photos provided by{' '}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-2 hover:underline hover:text-brand-700"
            >
              Pexels
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
