import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';
import { homeFaqs, vendorFaqs, pricingFaqs } from '../data/faqs';

const categories = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    blurb: 'Downloading uTap, signing in, scanning your first card.',
  },
  {
    slug: 'scanning',
    title: 'Scanning your student card',
    blurb: 'NFC, cards we support, what to do if a scan fails.',
  },
  {
    slug: 'orders',
    title: 'Orders and pickup',
    blurb: 'Placing orders, pickup codes, and what to expect.',
  },
  {
    slug: 'payments',
    title: 'Payments and refunds',
    blurb: 'How Yoco works, refunds, and disputed charges.',
  },
  {
    slug: 'tickets',
    title: 'Tickets',
    blurb: 'Buying, showing, and transferring uGig tickets.',
  },
  {
    slug: 'vendors',
    title: 'Vendors',
    blurb: 'Opening a store, listing products, getting paid.',
  },
  {
    slug: 'account',
    title: 'Account and privacy',
    blurb: 'Your data, sign-out, account deletion, and consent.',
  },
];

export default function Help() {
  return (
    <>
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Help centre
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            How can we help?
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            Categorised answers. If you can't find what you're looking for, send us a message.
          </p>
        </div>
      </section>

      <Section className="bg-white" variant="tight">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to="/contact"
              className="group block rounded-2xl bg-white p-6 border border-slate-100 shadow-card transition-all duration-200 ease-out-soft hover:shadow-card-lg hover:-translate-y-0.5 hover:border-brand-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <h3 className="text-lg font-bold text-ink">{cat.title}</h3>
              <p className="mt-2 text-ink-muted leading-relaxed">{cat.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                Read
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="bg-emerald-soft">
        <SectionHeading
          eyebrow="Quick answers"
          title="The questions we get most"
          subtitle="A snapshot from the most-read categories."
        />
        <div className="space-y-8">
          <BlockHeading title="Students" />
          <Accordion items={homeFaqs} />
          <BlockHeading title="Vendors" />
          <Accordion items={vendorFaqs} />
          <BlockHeading title="Pricing" />
          <Accordion items={pricingFaqs} />
        </div>
      </Section>

      <Section className="bg-white" variant="tight">
        <Card hover={false} className="!p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-ink">Still stuck?</h3>
          <p className="mt-2 text-ink-muted leading-relaxed">
            Send a quick note. We try to reply within one working day.
          </p>
          <div className="mt-5">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-gradient text-white font-semibold px-6 py-3 shadow-card-lg hover:brightness-105 transition-all duration-200 ease-out-soft active:scale-[0.98]"
            >
              Send a message
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </Card>
      </Section>
    </>
  );
}

function BlockHeading({ title }: { title: string }) {
  return (
    <h3 className="text-lg font-bold text-ink">{title}</h3>
  );
}
