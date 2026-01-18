'use client';

const templates = [
  {
    name: 'privacy-cash',
    displayName: 'Privacy Cash',
    description: 'Private transfers with zero-knowledge proofs',
    color: 'blue',
    recommended: true,
    features: ['SOL & SPL Tokens', 'ZK Proofs', 'Node 24+'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    name: 'light-protocol',
    displayName: 'Light Protocol',
    description: 'ZK compression for 5000x cheaper transactions',
    color: 'purple',
    features: ['Compressed Tokens', '5000x Savings', 'Helius RPC'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'arcium',
    displayName: 'Arcium',
    description: 'MPC computation for private smart contracts',
    color: 'orange',
    features: ['MPC Network', 'Anchor', 'Advanced'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    name: 'full-stack',
    displayName: 'Full Stack',
    description: 'All privacy integrations combined',
    color: 'green',
    features: ['All 3 SDKs', 'Unified API', 'Comparison UI'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

export function TemplateShowcase() {
  const getColorClasses = (color: string) => {
    const colors: Record<string, { border: string; text: string; bg: string }> = {
      blue: { border: 'hover:border-primary/50', text: 'text-primary', bg: 'bg-primary/10' },
      purple: { border: 'hover:border-secondary/50', text: 'text-secondary', bg: 'bg-secondary/10' },
      orange: { border: 'hover:border-accent/50', text: 'text-accent', bg: 'bg-accent/10' },
      green: { border: 'hover:border-success/50', text: 'text-success', bg: 'bg-success/10' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8" id="templates">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Choose Your Template</h2>
        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          Each template comes pre-configured with the SDK, wallet integration, and a demo page.
          Pick the one that fits your use case.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template) => {
            const colors = getColorClasses(template.color);
            const isRecommended = 'recommended' in template && template.recommended;
            return (
              <div
                key={template.name}
                className={`relative p-6 bg-surface rounded-lg border card-hover ${colors.border} ${
                  isRecommended ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border'
                }`}
              >
                {isRecommended && (
                  <span className="absolute -top-3 left-4 px-2 py-0.5 text-xs font-medium bg-primary text-white rounded-full">
                    Recommended
                  </span>
                )}
                <div className={`w-12 h-12 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}>
                  {template.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{template.displayName}</h3>
                <p className="text-sm text-zinc-400 mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-1 bg-zinc-800 rounded-lg text-zinc-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
