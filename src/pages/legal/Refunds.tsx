import { Link } from 'react-router-dom';
import { Section } from '../../components/ui/Section';

export default function Refunds() {
  return (
    <>
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Legal · Refunds
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Refunds, simply.
          </h1>
          <p className="mt-5 text-lg text-ink-muted leading-relaxed">
            If a vendor cancels, you're refunded automatically. If your order didn't arrive as promised,{' '}
            <Link to="/contact" className="font-semibold text-brand-700 hover:underline">
              get in touch
            </Link>
            {' '}— we'll sort it.
          </p>
        </div>
      </section>

      <Section className="bg-white" variant="tight">
        <div className="max-w-3xl mx-auto space-y-6 text-ink-muted leading-relaxed">
          <p>
            Vendor-cancelled orders are refunded in full to the original payment method, usually within one to two working days.
          </p>
          <p>
            For partial refunds or disputed charges, message us with your order reference and we'll come back to you within one working day.
          </p>
        </div>
      </Section>
    </>
  );
}
