import { Section, SectionHeading } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FAQTeaser } from '../components/sections/FAQTeaser';
import { pricingFaqs } from '../data/faqs';

const tiles = [
  {
    title: 'Listing',
    price: 'Free',
    body: "List your store and your products. We don't charge to be on uTap.",
  },
  {
    title: 'Commission',
    price: '8%',
    suffix: ' per paid order',
    body: "Charged to the vendor on each successful order. Reduces your payout, never the student's total.",
  },
  {
    title: 'Yoco fee',
    price: '2.95% + VAT',
    suffix: ' per transaction',
    body: 'Paid to Yoco, not to uTap. Shown separately on your statement.',
  },
  {
    title: 'Payouts',
    price: 'R\u202f50 min',
    suffix: ' on demand or the 28th',
    body: 'Auto-payouts go to your Yoco bank account on the 28th of every month. Request one any time.',
  },
];

export default function Pricing() {
  // Worked example: R 100 order
  const order = 100;
  const yocoFee = +(order * 0.0295).toFixed(2);
  const platformFee = +(order * 0.08).toFixed(2);
  const net = +(order - yocoFee - platformFee).toFixed(2);

  return (
    <>
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Pricing
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Pricing without the surprise.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            Free to list. A small commission on each paid order. Every cent on your statement.
          </p>
        </div>
      </section>

      <Section className="bg-white" variant="tight">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiles.map((t) => (
            <Card key={t.title} className="h-full">
              <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide">
                {t.title}
              </p>
              <p className="mt-2">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
                  {t.price}
                </span>
                {t.suffix && (
                  <span className="ml-1 text-sm text-ink-muted">{t.suffix}</span>
                )}
              </p>
              <p className="mt-3 text-ink-muted leading-relaxed">{t.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-emerald-soft">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <SectionHeading
              align="left"
              eyebrow="Worked example"
              title="R\u202f100 order, line by line"
              subtitle="No surprises. No hidden fees. Just the numbers."
              className="mb-0"
            />
          </div>
          <div className="lg:col-span-6">
            <Card hover={false} className="bg-white">
              <dl className="divide-y divide-slate-100 text-base">
                <Row label="Student pays" value={`R\u202f${order.toFixed(2)}`} bold />
                <Row label="Yoco fee (2.95% + VAT)" value={`− R\u202f${yocoFee.toFixed(2)}`} muted />
                <Row label="uTap commission (8%)" value={`− R\u202f${platformFee.toFixed(2)}`} muted />
                <Row label="You receive" value={`R\u202f${net.toFixed(2)}`} bold highlight />
              </dl>
              <p className="mt-4 text-xs text-ink-muted">
                Percentages are illustrative. Live rates are shown on your statement once your store is open.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <FAQTeaser
        faqs={pricingFaqs}
        title="Pricing questions"
        subtitle="Money questions get money answers."
        ctaHref="/help"
      />

      <Section className="bg-white" variant="tight">
        <div className="rounded-3xl bg-emerald-gradient p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to list your store?
          </h2>
          <p className="mt-3 text-white/90">
            Set up in about 10 minutes. We're here if you get stuck.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/contact" variant="dark" size="lg">
              Open my store
            </Button>
            <Button as="a" href="mailto:vendors@utap.co.za" variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
              Email the team
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
  highlight,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <dt
        className={
          muted
            ? 'text-ink-muted'
            : bold
              ? 'font-semibold text-ink'
              : 'text-ink'
        }
      >
        {label}
      </dt>
      <dd
        className={
          highlight
            ? 'font-extrabold text-brand-700 text-lg'
            : bold
              ? 'font-bold text-ink'
              : muted
                ? 'text-ink-muted'
                : 'text-ink'
        }
      >
        {value}
      </dd>
    </div>
  );
}
