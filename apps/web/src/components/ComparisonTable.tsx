'use client';

const comparisons = [
  {
    category: 'Setup Time',
    manual: '2+ hours',
    privkit: '30 seconds',
  },
  {
    category: 'Configuration',
    manual: 'Manual webpack, TypeScript, env setup',
    privkit: 'Pre-configured and ready',
  },
  {
    category: 'SDK Integration',
    manual: 'Read docs, copy examples, debug',
    privkit: 'Working examples included',
  },
  {
    category: 'Dependencies',
    manual: 'Possibly outdated, version conflicts',
    privkit: 'Always tested & current',
  },
  {
    category: 'Wallet Integration',
    manual: 'Implement from scratch',
    privkit: 'Built-in with UI',
  },
  {
    category: 'Testing Setup',
    manual: 'Configure yourself',
    privkit: 'Vitest ready to go',
  },
];

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ComparisonTable() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why Not Just Do It Manually?</h2>
        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          You could spend hours reading docs and wiring up SDKs. Or you could start building in 30 seconds.
        </p>

        <div className="overflow-hidden rounded-lg border border-border">
          {/* Header */}
          <div className="grid grid-cols-3 bg-zinc-800/50">
            <div className="p-4 font-semibold text-zinc-400 border-r border-border">Aspect</div>
            <div className="p-4 font-semibold text-zinc-400 border-r border-border flex items-center gap-2">
              <XIcon />
              Manual Setup
            </div>
            <div className="p-4 font-semibold text-primary flex items-center gap-2">
              <CheckIcon />
              PrivKit
            </div>
          </div>

          {/* Rows */}
          {comparisons.map((row, index) => (
            <div
              key={row.category}
              className={`grid grid-cols-3 ${
                index < comparisons.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="p-4 font-medium text-zinc-300 border-r border-border bg-surface/50">
                {row.category}
              </div>
              <div className="p-4 text-zinc-500 border-r border-border">
                {row.manual}
              </div>
              <div className="p-4 text-zinc-300 bg-primary/5">
                {row.privkit}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-8 text-center">
          <p className="text-zinc-400">
            Stop configuring. Start building.
          </p>
        </div>
      </div>
    </section>
  );
}
