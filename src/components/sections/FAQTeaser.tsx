import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import { Accordion } from '../ui/Accordion';
import type { FAQ } from '../../data/faqs';

export function FAQTeaser({
  faqs,
  title = 'Common questions',
  subtitle,
  ctaLabel = 'See all questions',
  ctaHref = '/help',
}: {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Section id="faq" className="bg-white">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={title}
            subtitle={subtitle ?? 'The questions we get most. There are more in the help centre.'}
            className="mb-6"
          />
          <Link
            to={ctaHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors group"
          >
            {ctaLabel}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqs} />
        </div>
      </div>
    </Section>
  );
}
