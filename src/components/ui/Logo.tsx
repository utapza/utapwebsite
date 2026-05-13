import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';

type Props = { className?: string; variant?: 'default' | 'inverse' };

export function Logo({ className, variant = 'default' }: Props) {
  const isInverse = variant === 'inverse';
  return (
    <Link
      to="/"
      className={cn(
        'inline-flex items-center gap-2 rounded-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        className,
      )}
      aria-label="uTap home"
    >
      <span
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-xl shadow-card',
          'bg-emerald-gradient text-white font-extrabold text-lg',
        )}
        aria-hidden="true"
      >
        u
      </span>
      <span
        className={cn(
          'text-xl font-extrabold tracking-tight',
          isInverse ? 'text-white' : 'text-ink',
        )}
      >
        uTap
      </span>
    </Link>
  );
}
