import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  /** Disable the fade-up entrance animation */
  animate?: boolean;
  /** Page top section gets larger spacing */
  variant?: 'default' | 'hero' | 'tight';
};

export function Section({
  id,
  className,
  containerClassName,
  children,
  animate = true,
  variant = 'default',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!animate || !ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  const padding =
    variant === 'hero'
      ? 'pt-28 pb-16 md:pt-36 md:pb-24'
      : variant === 'tight'
        ? 'py-10 md:py-14'
        : 'py-16 md:py-24';

  return (
    <section
      ref={ref}
      id={id}
      className={cn(padding, animate && 'section-animate', className)}
    >
      <div className={cn('container-page', containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-ink-muted leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
