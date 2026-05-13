import { Mail, MessageSquare, Newspaper, Handshake } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { ContactForm } from '../components/forms/ContactForm';

const channels = [
  { icon: MessageSquare, label: 'General', email: 'hello@utap.co.za' },
  { icon: Mail, label: 'Vendors', email: 'vendors@utap.co.za' },
  { icon: Newspaper, label: 'Press', email: 'press@utap.co.za' },
  { icon: Handshake, label: 'Partnerships', email: 'partners@utap.co.za' },
];

export default function Contact() {
  return (
    <>
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Contact
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Get in touch.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            We try to reply within one working day.
          </p>
        </div>
      </section>

      <Section className="bg-white" variant="tight">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-3">
            {channels.map(({ icon: Icon, label, email }) => (
              <Card key={email} hover={false} className="!p-5 flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
                    {label}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="block truncate font-semibold text-ink hover:text-brand-700 transition-colors"
                  >
                    {email}
                  </a>
                </div>
              </Card>
            ))}
          </div>
          <div className="lg:col-span-7">
            <Card hover={false} className="!p-6 md:!p-8">
              <ContactForm />
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
