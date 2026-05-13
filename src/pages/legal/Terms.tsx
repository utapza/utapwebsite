import { Link } from 'react-router-dom';
import { Section } from '../../components/ui/Section';

export default function Terms() {
  return (
    <>
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Legal · Terms
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-[1.05]">
            The fine print, in plain English.
          </h1>
          <p className="mt-5 text-lg text-ink-muted leading-relaxed">
            Here's what you agree to when you use uTap. We've tried to keep it short. If you'd rather speak to a person,{' '}
            <Link to="/contact" className="font-semibold text-brand-700 hover:underline">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      <Section className="bg-white" variant="tight">
        <div className="prose prose-trim max-w-3xl mx-auto text-ink-muted leading-relaxed">
          <p>
            The full terms of service will live here once finalised by our legal team. Until then, please reach out at{' '}
            <a href="mailto:hello@utap.co.za" className="font-semibold text-brand-700 hover:underline">
              hello@utap.co.za
            </a>{' '}
            with any questions.
          </p>
        </div>
      </Section>
    </>
  );
}
