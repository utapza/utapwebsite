import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/Button';

const features = [
  'Free to list — zero uTap commission on orders',
  'One inbox for all your orders',
  'Predictable monthly subscription for growth tools',
  'Vouchers, discounts & bundle promotions',
  'Set your own hours, pause orders, manage the queue',
  'Run multiple stores under one login',
];

const objections = [
  {
    q: '"What do I need to start?"',
    a: 'An email, a phone, a Yoco bank account, and a store on or near campus. Setup takes about 10 minutes.',
  },
  {
    q: '"Is there a setup or subscription fee?"',
    a: 'Starting is free. The Starter plan has zero uTap commissions — you only pay standard payment gateway fees. The Growth subscription adds advanced analytics, promoted placements, and push notifications for a flat monthly fee.',
  },
  {
    q: '"What if students don\'t use the app?"',
    a: 'uTap is the campus wallet — students use it to carry their student card, order food, and get event tickets. It\'s where they already are.',
  },
];

export default function VendorOnePager() {
  return (
    <>
      <Helmet>
        <title>Vendor One-Pager — uTap</title>
        <meta
          name="description"
          content="Why campus vendors choose uTap over Mr D and Uber Eats. Zero commissions vs 25–35%. Free to list. Predictable monthly subscriptions for growth."
        />
      </Helmet>

      {/* Page hero */}
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-10 md:pb-14">
        <div className="container-page max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            For vendors
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
            The numbers your vendors need to see.
          </h1>
          <p className="mt-4 text-lg text-ink-muted leading-relaxed">
            Share this page with any campus vendor who is still paying 25–35% commission to a delivery platform.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            <Button as="a" href="https://vendors.utaptech.co.za" size="lg">
              Open my store
            </Button>
            <Button as="a" href="mailto:vendors@utap.co.za" variant="secondary" size="lg">
              Talk to our team
            </Button>
          </div>
        </div>
      </section>

      {/* One-pager card */}
      <section className="bg-white py-12 md:py-20">
        <div className="container-page max-w-3xl">
          <div className="rounded-3xl border border-slate-200 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
              <div>
                <p className="text-xl font-extrabold tracking-tight text-ink">uTap</p>
                <p className="text-sm text-ink-muted mt-0.5">The campus marketplace — built for vendors like you.</p>
              </div>
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                For vendors
              </span>
            </div>

            {/* Hook */}
            <div className="px-8 py-7 border-b border-slate-100 bg-emerald-soft">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink leading-tight">
                Stop giving away a third of every order.
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">
                Delivery platforms charge 25–35% commission on every single sale. uTap charges <strong>zero transaction commissions</strong>.
                Same students. Same campus. You keep what you earn.
              </p>
            </div>

            {/* Commission comparison */}
            <div className="px-8 py-7 border-b border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-5">
                On a R&nbsp;100 order, you keep
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
                  <p className="text-xs font-semibold text-ink-muted mb-2">Mr D / Uber Eats</p>
                  <p className="text-4xl font-extrabold tracking-tight text-ink">R&nbsp;65–73</p>
                  <p className="text-sm text-ink-muted mt-1">After 27–35% commission</p>
                </div>
                <div className="rounded-2xl border border-brand-200 bg-brand-50 px-6 py-5">
                  <p className="text-xs font-semibold text-brand-700 mb-2">uTap (Starter)</p>
                  <p className="text-4xl font-extrabold tracking-tight text-brand-700">~R&nbsp;97</p>
                  <p className="text-sm text-brand-600 mt-1">After payment gateway fee only</p>
                </div>
              </div>
            </div>

            {/* Worked example */}
            <div className="px-8 py-7 border-b border-slate-100 bg-slate-50">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-5">
                Worked example — R&nbsp;100 order
              </p>
              <dl className="divide-y divide-slate-200">
                {[
                  { label: 'Student pays', value: 'R 100.00', strong: false },
                  { label: 'Yoco fee (2.95% + VAT)', value: '− R 2.95', strong: false },
                  { label: 'uTap commission', value: 'R 0.00', strong: false },
                  { label: 'You receive', value: '~R 97.05', strong: true },
                ].map(({ label, value, strong }) => (
                  <div
                    key={label}
                    className={`flex justify-between items-center py-3 text-sm ${strong ? 'pt-4' : ''}`}
                  >
                    <dt className={strong ? 'font-semibold text-ink' : 'text-ink-muted'}>{label}</dt>
                    <dd className={strong ? 'text-lg font-extrabold text-brand-700' : 'text-ink-muted'}>{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-ink-muted">
                Percentages are illustrative. Live rates are shown on your statement once your store is open.
              </p>
            </div>

            {/* What you get */}
            <div className="px-8 py-7 border-b border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-5">
                What you get
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-ink-muted">
                    <span className="mt-1 flex-shrink-0 h-4 w-4 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Objections */}
            <div className="px-8 py-7 border-b border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-5">
                Common questions
              </p>
              <div className="space-y-5">
                {objections.map(({ q, a }) => (
                  <div key={q} className="grid sm:grid-cols-2 gap-2 sm:gap-6 text-sm">
                    <p className="text-ink-muted italic">{q}</p>
                    <p className="text-ink">{a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-ink-muted">
                <span className="font-semibold text-ink block mb-0.5">Ready to open your store?</span>
                vendors.utaptech.co.za &nbsp;·&nbsp; vendors@utap.co.za
              </div>
              <Button as="a" href="https://vendors.utaptech.co.za" size="md">
                Open my store →
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Share nudge */}
      <section className="bg-emerald-soft py-10">
        <div className="container-page max-w-3xl text-center">
          <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide mb-2">Know a vendor who should see this?</p>
          <p className="text-ink-muted text-sm">
            Share this link:{' '}
            <span className="font-mono text-ink bg-white border border-slate-200 rounded-lg px-2 py-0.5 text-xs">
              utaptech.co.za/downloads/vendor-one-pager
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
