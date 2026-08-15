import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { z } from 'astro/zod';
import { $formStatus, $formError, resetForm } from '@/lib/stores/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { LucideIcon } from './lucide-icon';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company must be at least 2 characters'),
  role: z.enum(['Agency', 'Brand', 'Producer', 'Other']),
  budget: z.enum(['<$10K', '$10K-$30K', '$30K-$50K', '>$50K', 'Not sure']),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  website: z.string().optional(),
});

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Agency' as const,
    budget: '$10K-$30K' as const,
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formStatus = useStore($formStatus);
  const formError = useStore($formError);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    if (formData.website) {
      $formStatus.set('success');
      return;
    }

    $formStatus.set('submitting');
    trackEvent({ name: AnalyticsEvents.CONTACT_FORM_SUBMIT });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      $formStatus.set('success');
      trackEvent({ name: AnalyticsEvents.CONTACT_FORM_SUCCESS });
      setFormData({
        name: '',
        email: '',
        company: '',
        role: 'Agency',
        budget: '$10K-$30K',
        message: '',
        website: '',
      });
    } catch (err) {
      $formStatus.set('error');
      $formError.set(err instanceof Error ? err.message : 'An error occurred');
      trackEvent({ name: AnalyticsEvents.CONTACT_FORM_ERROR });
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-8 text-center">
        <LucideIcon name="CheckCircle" className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h3 className="mb-2 text-2xl font-semibold text-foreground">Thank you!</h3>
        <p className="mb-6 text-foreground/80">
          We've received your message and will respond within 24 hours.
        </p>
        <Button onClick={resetForm} variant="outline">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Name *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={formStatus === 'submitting'}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={formStatus === 'submitting'}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
          Company *
        </label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          disabled={formStatus === 'submitting'}
          aria-invalid={errors.company ? 'true' : 'false'}
          aria-describedby={errors.company ? 'company-error' : undefined}
        />
        {errors.company && (
          <p id="company-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.company}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="role" className="mb-2 block text-sm font-medium text-foreground">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={formStatus === 'submitting'}
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="Agency">Agency</option>
            <option value="Brand">Brand</option>
            <option value="Producer">Producer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-foreground">
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            disabled={formStatus === 'submitting'}
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="<$10K">&lt;$10K</option>
            <option value="$10K-$30K">$10K-$30K</option>
            <option value="$30K-$50K">$30K-$50K</option>
            <option value=">$50K">&gt;$50K</option>
            <option value="Not sure">Not sure</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={formStatus === 'submitting'}
          rows={5}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="absolute left-[-9999px]"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {formError && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4" role="alert">
          <div className="flex items-center gap-2 text-red-500">
            <LucideIcon name="AlertCircle" className="h-5 w-5" />
            <p className="text-sm">{formError}</p>
          </div>
        </div>
      )}

      <Button type="submit" disabled={formStatus === 'submitting'} className="w-full">
        {formStatus === 'submitting' ? (
          <>
            <LucideIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <LucideIcon name="Send" className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
