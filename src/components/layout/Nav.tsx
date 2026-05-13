import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

const links = [
  { to: '/students', label: 'Students' },
  { to: '/vendors', label: 'Vendors' },
  { to: '/universities', label: 'Universities' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Insights' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/help', label: 'Help' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out-soft',
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-card border-b border-slate-100'
          : 'bg-white/0 border-b border-transparent',
      )}
    >
      <div className="container-page flex h-16 md:h-18 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ease-out-soft',
                  'hover:text-brand-700 hover:bg-brand-50',
                  isActive ? 'text-brand-700 bg-brand-50' : 'text-ink-muted',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button as="a" href="https://vendors.utaptech.co.za" variant="ghost" size="sm">
            Open a store
          </Button>
          <Button as="link" to="/students" size="sm">
            Download uTap
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            'lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full',
            'text-ink hover:bg-brand-50 transition-colors cursor-pointer',
          )}
          onClick={() => setOpen((s) => !s)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden overflow-hidden border-t border-slate-100 bg-white',
          'transition-[max-height,opacity] duration-300 ease-out-soft',
          open ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="container-page py-4 flex flex-col gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink hover:bg-slate-50',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-3 flex flex-col gap-2 pb-2">
            <Button as="a" href="https://vendors.utaptech.co.za" variant="secondary" size="md">
              Open a store
            </Button>
            <Button as="link" to="/students" size="md">
              Download uTap
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
