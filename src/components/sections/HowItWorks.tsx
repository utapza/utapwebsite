import { Section, SectionHeading } from '../ui/Section';

type Step = { n: string; title: string; body: string };

const defaultSteps: Step[] = [
  {
    n: '01',
    title: 'Scan your card',
    body: 'Hold your student card against the back of your phone. We save it in seconds.',
  },
  {
    n: '02',
    title: 'Order from campus',
    body: "Find what's open, pay on your phone, pick up when it's ready.",
  },
  {
    n: '03',
    title: 'Tap to enter',
    body: 'Wherever the readers work, your phone is the card.',
  },
];

export function HowItWorks({
  steps = defaultSteps,
  eyebrow = 'Three steps',
  title = 'How uTap works',
  subtitle,
}: {
  steps?: Step[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section className="bg-emerald-soft">
      <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <ol className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
        {/* Connector line */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute left-[16.667%] right-[16.667%] top-7 h-px bg-gradient-to-r from-brand-200 via-brand-400/60 to-brand-200"
        />
        {steps.map((step) => (
          <li key={step.n} className="relative flex flex-col items-start text-left">
            <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-brand-200 shadow-card text-brand-700 font-extrabold text-lg">
              {step.n}
            </div>
            <h3 className="mt-5 text-xl font-bold text-ink">{step.title}</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
