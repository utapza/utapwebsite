import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';

type Status = 'idle' | 'loading' | 'success' | 'error';

type Errors = Partial<Record<'name' | 'email' | 'topic' | 'message', string>>;

const inputBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-ink placeholder:text-ink-muted/70 ' +
  'transition-colors duration-200 ease-out-soft ' +
  'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-0 focus:border-brand-500';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (formData: FormData): Errors => {
    const errs: Errors = {};
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const topic = String(formData.get('topic') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    if (!name) errs.name = 'Tell us what to call you.';
    if (!email) errs.email = 'We need an email to reply.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "That email doesn't look right.";
    if (!topic) errs.topic = "Pick what it's about.";
    if (!message) errs.message = 'Add a quick message.';
    return errs;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    try {
      // Wire up to a real endpoint later. Simulate the call for now.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      e.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center"
      >
        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-gradient text-white">
          <Check size={22} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-ink">Got it.</h3>
        <p className="mt-2 text-ink-muted">
          We'll come back to you within one working day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 text-sm font-semibold text-brand-700 hover:underline cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-err' : undefined}
          className={cn(
            inputBase,
            errors.name ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-200',
          )}
          placeholder="Thando"
        />
        {errors.name && (
          <p id="name-err" className="mt-1.5 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-err' : undefined}
          className={cn(
            inputBase,
            errors.email ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-200',
          )}
          placeholder="you@university.ac.za"
        />
        {errors.email && (
          <p id="email-err" className="mt-1.5 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="topic" className="mb-1.5 block text-sm font-medium text-ink">
          What's it about?
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue=""
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? 'topic-err' : undefined}
          className={cn(
            inputBase,
            errors.topic ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-200',
          )}
        >
          <option value="" disabled>
            Pick one
          </option>
          <option value="student">Student question</option>
          <option value="vendor">Opening a store</option>
          <option value="partnership">Partnership / university</option>
          <option value="press">Press enquiry</option>
          <option value="other">Something else</option>
        </select>
        {errors.topic && (
          <p id="topic-err" className="mt-1.5 text-sm text-red-600">
            {errors.topic}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'msg-err' : undefined}
          className={cn(
            inputBase,
            'resize-none',
            errors.message ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-slate-200',
          )}
          placeholder="A short note is fine — we'll reply with the details."
        />
        {errors.message && (
          <p id="msg-err" className="mt-1.5 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Something on our side hiccuped. Try again, or email{' '}
          <a href="mailto:hello@utap.co.za" className="font-semibold underline">
            hello@utap.co.za
          </a>
          .
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        loading={status === 'loading'}
        loadingLabel="Sending…"
        className="w-full sm:w-auto"
      >
        Send message
      </Button>
    </form>
  );
}
