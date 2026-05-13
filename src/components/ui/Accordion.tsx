import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';
import type { FAQ } from '../../data/faqs';

type Props = {
  items: FAQ[];
  className?: string;
};

export function Accordion({ items, className }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white', className)}>
      {items.map((item, idx) => {
        const open = openIdx === idx;
        const id = `faq-${idx}`;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${id}-panel`}
              id={`${id}-trigger`}
              onClick={() => setOpenIdx(open ? null : idx)}
              className={cn(
                'flex w-full items-center justify-between gap-4 px-5 py-5 text-left',
                'transition-colors duration-200 ease-out-soft cursor-pointer',
                'hover:bg-brand-50/60 focus-visible:bg-brand-50/60',
              )}
            >
              <span className="font-semibold text-ink text-base md:text-lg">
                {item.q}
              </span>
              <ChevronDown
                size={20}
                className={cn(
                  'flex-shrink-0 text-brand-600 transition-transform duration-200 ease-out-soft',
                  open && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`${id}-panel`}
              role="region"
              aria-labelledby={`${id}-trigger`}
              className={cn(
                'grid overflow-hidden transition-all duration-300 ease-out-soft',
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-ink-muted leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
