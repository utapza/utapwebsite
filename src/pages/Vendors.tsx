import { Inbox, BadgePercent, Wallet, Store } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { HowItWorks } from '../components/sections/HowItWorks';
import { FAQTeaser } from '../components/sections/FAQTeaser';
import { FinalCTA } from '../components/sections/FinalCTA';
import { vendorFaqs } from '../data/faqs';
import { images } from '../data/images';

const vendorSteps = [
  {
    n: '01',
    title: 'Open your store',
    body: 'Sign up online. Add your store name, hours, and a logo.',
  },
  {
    n: '02',
    title: 'List a few products',
    body: 'Upload your menu or stock list. We give you sensible defaults.',
  },
  {
    n: '03',
    title: 'Take orders',
    body: "Students see you when you're open. Orders ping you in the portal.",
  },
  {
    n: '04',
    title: 'Get paid',
    body: 'Payouts to your Yoco bank account on a schedule. Request earlier any time.',
  },
];

export default function Vendors() {
  return (
    <>
      <section className="relative bg-emerald-soft pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="container-page grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              For vendors
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
              Sell to students before they walk past.
            </h1>
            <p className="mt-5 max-w-xl text-lg sm:text-xl text-ink-muted leading-relaxed">
              Open your store on uTap, take orders from the campus next door, and get paid on a schedule you can count on.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button as="a" href="https://vendors.utaptech.co.za" size="lg">
                Open my store
              </Button>
              <Button as="a" href="mailto:vendors@utaptech.co.za" variant="secondary" size="lg">
                Talk to our team
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={images.vendor}
              alt="A campus vendor packaging an order"
              className="w-full h-[420px] md:h-[480px] object-cover rounded-[2rem] border border-slate-200 shadow-card-lg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Why uTap"
          title="One inbox. Every order. Predictable payouts."
          subtitle="Built around the real questions vendors ask: how do orders come in, when do I get paid, what does it cost?"
        />
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {[
            {
              icon: Inbox,
              title: 'One inbox.',
              body: 'Phones, tablets, multiple shops — every order in one place.',
            },
            {
              icon: Wallet,
              title: 'Get paid the 28th.',
              body: 'Predictable payouts to your Yoco bank account. Request earlier any time.',
            },
            {
              icon: BadgePercent,
              title: 'Promotions, sorted.',
              body: 'Vouchers, discounts, bundle deals. Set start and end times.',
            },
            {
              icon: Store,
              title: 'Run two shops? Run them both.',
              body: 'Add as many outlets as you have. One log-in, one finance tab.',
            },
            {
              icon: Inbox,
              title: 'Less queue management.',
              body: 'Students collect when it\'s ready. You cook, sell, and breathe.',
            },
            {
              icon: Wallet,
              title: 'Pricing without surprises.',
              body: 'A small commission per paid order. Every cent on your statement.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <Card key={title} className="h-full">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon size={22} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>
              <p className="mt-2 text-ink-muted leading-relaxed">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <HowItWorks
        eyebrow="How it works"
        title="From signup to payout"
        steps={vendorSteps}
      />

      <Section className="bg-white">
        <div className="rounded-3xl border border-brand-200 bg-brand-50/50 p-8 md:p-12">
          <SectionHeading
            align="left"
            eyebrow="Pricing"
            title="Pricing without the surprise."
            subtitle="We take a small commission on each order. You pay nothing to list your store. Every cent of the math is on your statement."
            className="mb-6"
          />
          <Button as="link" to="/pricing" size="md">
            See full pricing
          </Button>
        </div>
      </Section>

      <FAQTeaser
        faqs={vendorFaqs}
        title="Vendor questions"
        subtitle="The questions we get most from store owners."
        ctaHref="/help"
      />

      <FinalCTA
        title="Ready to open up?"
        body="Takes about 10 minutes. You can save your draft and come back."
        primary={{ href: 'https://vendors.utaptech.co.za', label: 'Open my store' }}
        secondary={{ to: '/pricing', label: 'See pricing first' }}
      />
    </>
  );
}
