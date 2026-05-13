import { Link } from 'react-router-dom';
import { CreditCard, ShoppingBag, Ticket, ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import { Card } from '../ui/Card';

const pillars = [
  {
    icon: CreditCard,
    title: 'Your student card. On your phone.',
    body: 'Scan it once. Tap into buildings, residences, and libraries — wherever campus accepts it. We back it up to the cloud so you can restore it on any phone.',
    cta: { to: '/students', label: 'How scanning works' },
  },
  {
    icon: ShoppingBag,
    title: 'Skip the queue.',
    body: 'Order food, books, electronics, and prints from trusted campus vendors near you. Pay with Yoco. Walk in, walk out.',
    cta: { to: '/students#ushop', label: 'See uShop' },
  },
  {
    icon: Ticket,
    title: 'Game day, sorted.',
    body: 'Varsity tickets, society launches, and campus gigs — all on the same screen. No print-outs, no scrambling.',
    cta: { to: '/students#ugig', label: 'See uGig' },
  },
];

export function Pillars() {
  return (
    <Section id="pillars" className="bg-white">
      <SectionHeading
        eyebrow="Three jobs, one tap each"
        title="What uTap does"
        subtitle="One app for the three things students do every day on campus."
      />

      <div className="grid md:grid-cols-3 gap-5 md:gap-6">
        {pillars.map(({ icon: Icon, title, body, cta }) => (
          <Card key={title} className="h-full flex flex-col">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <Icon size={22} aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl md:text-2xl font-bold text-ink">{title}</h3>
            <p className="mt-3 flex-1 text-ink-muted leading-relaxed">{body}</p>
            <Link
              to={cta.to}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 transition-colors group"
            >
              {cta.label}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
