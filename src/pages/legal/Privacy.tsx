import { Link } from 'react-router-dom';
import { Section } from '../../components/ui/Section';

export default function Privacy() {
  return (
    <>
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Legal · Privacy
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Your data, in plain English.
          </h1>
          <p className="mt-5 text-lg text-ink-muted leading-relaxed">
            Here's what we collect, why, and what we do with it. We don't sell student data and we won't ever.
          </p>
        </div>
      </section>

      <Section className="bg-white" variant="tight">
        <div className="max-w-3xl mx-auto space-y-6 text-ink-muted leading-relaxed">
          <p>
            Card credentials are encrypted on device. We sync to the cloud only when you're signed in, so you can restore your wallet on a new phone.
          </p>
          <p>
            Universities and vendors receive aggregated, anonymised reporting — never per-student spend data.
          </p>
          <p>
            You can opt out and delete your data at any time. Need help?{' '}
            <Link to="/contact" className="font-semibold text-brand-700 hover:underline">
              Get in touch
            </Link>
            .
          </p>
          <p className="text-sm">
            The full privacy policy will publish here in full once finalised by our legal team.
          </p>
        </div>
      </Section>
    </>
  );
}
