import { Cloud, ShieldCheck, ShoppingBag, Smartphone, Ticket } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FinalCTA } from '../components/sections/FinalCTA';
import { HowItWorks } from '../components/sections/HowItWorks';
import { images } from '../data/images';

export default function Students() {
  return (
    <>
      <section className="relative bg-emerald-soft pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="container-page grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              For students
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
              Your student card lives on your phone now.
            </h1>
            <p className="mt-5 max-w-xl text-lg sm:text-xl text-ink-muted leading-relaxed">
              Tap into buildings, order from campus vendors, and grab tickets for what's on — one app does it all.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button as="link" to="/students#download" size="lg">
                Download uTap
              </Button>
              <Button as="link" to="/help" variant="secondary" size="lg">
                How scanning works
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 rounded-[3rem] bg-emerald-gradient opacity-20 blur-2xl" aria-hidden="true" />
              <img
                src={images.identity}
                alt="A student holding their phone next to a card reader"
                className="relative w-full h-[420px] md:h-[520px] object-cover rounded-[2rem] border border-slate-200 shadow-card-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="What's inside"
          title="Built around what you already do"
          subtitle="No new habits to learn. Just less friction in the ones you have."
        />

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {[
            {
              icon: Smartphone,
              title: 'Scan once. Tap forever.',
              body: 'Your physical card stays in your drawer. Your uTap wallet goes everywhere.',
            },
            {
              icon: ShoppingBag,
              title: 'Order before you arrive.',
              body: 'Real vendors. Real prices. Pickup when it\'s ready. Pay with Apple Pay, Google Pay, or your card via Yoco.',
            },
            {
              icon: Ticket,
              title: "Tickets that don't get lost.",
              body: 'Buy on your phone, show on your phone. The ticket lives next to your card.',
            },
            {
              icon: Cloud,
              title: "Lost your phone? Your card isn't lost.",
              body: 'We back up to the cloud when you sign in. Restore it on a new phone in seconds.',
            },
            {
              icon: ShieldCheck,
              title: 'Your data is yours.',
              body: "We only ask for what we need. We don't sell student data.",
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

      <HowItWorks />
      <FinalCTA />
    </>
  );
}
