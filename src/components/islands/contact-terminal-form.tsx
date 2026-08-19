import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  organization: string;
  email: string;
  timeline: string;
  brief: string;
  intents: string[];
}

const INTENT_OPTIONS = [
  'XR / AR / VR',
  'Immersive Space',
  'Interactive Scenography',
  'Projection Mapping',
  'Sensors / Hardware',
  'Advanced Web / WebGL',
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select timeline' },
  { value: 'immediate', label: 'Immediate' },
  { value: '1-3-months', label: '1-3 Months' },
  { value: 'exploratory', label: 'Exploratory' },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactTerminalForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    organization: '',
    email: '',
    timeline: '',
    brief: '',
    intents: [],
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const handleIntentToggle = (intent: string) => {
    setFormData((prev) => ({
      ...prev,
      intents: prev.intents.includes(intent)
        ? prev.intents.filter((i) => i !== intent)
        : [...prev.intents, intent],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTerminalOutput(['[CONNECTING...]']);

    // Simulate terminal sequence
    await new Promise((resolve) => setTimeout(resolve, 800));
    setTerminalOutput((prev) => [...prev, '[TRANSMITTING DATA...]']);

    await new Promise((resolve) => setTimeout(resolve, 600));
    setTerminalOutput((prev) => [...prev, '[ENCRYPTING PACKET...]']);

    await new Promise((resolve) => setTimeout(resolve, 500));
    setTerminalOutput((prev) => [...prev, '[PACKET SENT // WE WILL REPLY WITHIN 24H]']);

    setStatus('success');
  };

  const handleReset = () => {
    setFormData({
      name: '',
      organization: '',
      email: '',
      timeline: '',
      brief: '',
      intents: [],
    });
    setStatus('idle');
    setTerminalOutput([]);
  };

  if (status === 'success') {
    return (
      <div className="border border-accent-primary/30 bg-bg-secondary p-8">
        <div className="mb-6 space-y-2 font-mono text-sm">
          {terminalOutput.map((line, index) => (
            <p key={index} className="text-accent-primary">
              {line}
            </p>
          ))}
        </div>
        <button
          onClick={handleReset}
          className="mt-6 border border-white/8 px-4 py-2 font-mono text-xs tracking-wider text-text-secondary transition-colors hover:border-accent-primary hover:text-accent-primary"
        >
          [ NEW INQUIRY ]
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Intent Filter */}
      <div>
        <label className="mb-4 block font-mono text-xs tracking-wider text-accent-primary">
          WHAT TYPE OF EXPLORATION DO YOU HAVE IN MIND?
        </label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {INTENT_OPTIONS.map((intent) => {
            const isSelected = formData.intents.includes(intent);
            return (
              <button
                key={intent}
                type="button"
                onClick={() => handleIntentToggle(intent)}
                className={cn(
                  'flex items-center gap-3 border p-3 text-left transition-all',
                  isSelected
                    ? 'border-accent-primary bg-accent-primary/10'
                    : 'border-white/8 hover:border-accent-primary/30'
                )}
              >
                <div
                  className={cn(
                    'flex h-4 w-4 items-center justify-center border',
                    isSelected ? 'border-accent-primary bg-accent-primary' : 'border-white/30'
                  )}
                >
                  {isSelected && (
                    <svg
                      className="h-3 w-3 text-bg-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={cn(
                    'font-mono text-xs tracking-wider',
                    isSelected ? 'text-accent-primary' : 'text-text-secondary'
                  )}
                >
                  {intent}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact Metrics */}
      <div>
        <label className="mb-4 block font-mono text-xs tracking-wider text-accent-primary">
          CONTACT METRICS
        </label>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block font-mono text-xs tracking-wider text-text-tertiary">
              NAME:
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-white/8 bg-bg-primary px-4 py-3 font-mono text-sm text-foreground placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs tracking-wider text-text-tertiary">
              ORGANIZATION:
            </label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full border border-white/8 bg-bg-primary px-4 py-3 font-mono text-sm text-foreground placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none"
              placeholder="Museum / Brand / Studio"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs tracking-wider text-text-tertiary">
              EMAIL:
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border border-white/8 bg-bg-primary px-4 py-3 font-mono text-sm text-foreground placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none"
              placeholder="contact@organization.com"
            />
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs tracking-wider text-text-tertiary">
              TIMELINE:
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className="w-full border border-white/8 bg-bg-primary px-4 py-3 font-mono text-sm text-foreground focus:border-accent-primary focus:outline-none"
            >
              {TIMELINE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Project Brief */}
      <div>
        <label className="mb-1 block font-mono text-xs tracking-wider text-text-tertiary">
          PROJECT BRIEF / SCOPE:
        </label>
        <textarea
          value={formData.brief}
          onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
          rows={6}
          className="w-full resize-none border border-white/8 bg-bg-primary px-4 py-3 font-mono text-sm text-foreground placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none"
          placeholder="Tell us about the space, concept, or technical challenge..."
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={cn(
            'group inline-flex items-center gap-3 border px-6 py-3 font-mono text-xs font-bold tracking-wider transition-all',
            status === 'submitting'
              ? 'cursor-not-allowed border-white/8 text-text-tertiary'
              : 'border-accent-primary/30 text-accent-primary hover:border-accent-primary hover:bg-accent-primary/10'
          )}
        >
          {status === 'submitting' ? '[ TRANSMITTING... ]' : '[ TRANSMIT INQUIRY → ]'}
        </button>
      </div>

      {/* Terminal Output (during submission) */}
      {status === 'submitting' && terminalOutput.length > 0 && (
        <div className="border border-white/8 bg-bg-primary p-4">
          <div className="space-y-1 font-mono text-xs">
            {terminalOutput.map((line, index) => (
              <p key={index} className="text-accent-primary">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}

export default ContactTerminalForm;
