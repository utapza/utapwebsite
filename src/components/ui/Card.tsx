import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className, hover = true }: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white p-6 md:p-7 shadow-card border border-slate-100',
        hover &&
          'transition-all duration-200 ease-out-soft hover:shadow-card-lg hover:-translate-y-0.5 hover:border-brand-200',
        className,
      )}
    >
      {children}
    </div>
  );
}
