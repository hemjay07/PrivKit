'use client';

import { useState } from 'react';

const steps = [
  {
    number: 1,
    title: 'Create your project',
    code: 'npx create-solana-privacy-app my-app',
    description: 'Scaffolds a complete privacy app in seconds',
  },
  {
    number: 2,
    title: 'Choose your template',
    code: '? Which privacy template? › privacy-cash',
    description: 'Answer prompts or use --template flag',
  },
  {
    number: 3,
    title: 'Start building',
    code: 'cd my-app && npm run dev',
    description: 'Your privacy app is ready at localhost:3000',
  },
];

function CopyCodeButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors duration-150 rounded active:scale-[0.9]"
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

export function QuickStart() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-surface/30" id="quickstart">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Start in 30 Seconds</h2>
        <p className="text-zinc-400 text-center mb-10">
          Three commands. That&apos;s all it takes.
        </p>

        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-4">
              {/* Step number */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                {step.number}
              </div>

              {/* Step content */}
              <div className="flex-grow">
                <h3 className="font-semibold text-zinc-200 mb-2">{step.title}</h3>
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5">
                  <code className="flex-grow font-mono text-sm text-success">
                    {step.code}
                  </code>
                  {step.number !== 2 && <CopyCodeButton text={step.code} />}
                </div>
                <p className="mt-2 text-sm text-zinc-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Documentation link */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/hemjay07/PrivKit#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            View full documentation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
