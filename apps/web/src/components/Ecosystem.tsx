'use client';

interface SDK {
  name: string;
  description: string;
  docsUrl: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const sdks: SDK[] = [
  {
    name: 'Privacy Cash',
    description: 'Private token transfers with zero-knowledge proofs. Shield and unshield SOL with cryptographic privacy guarantees.',
    docsUrl: 'https://docs.privacycash.dev',
    color: 'primary',
    features: ['ZK Proofs', 'Private Transfers', 'Shielded Pools'],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1a4 4 0 0 0-4 4v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V5a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v3h-4V5a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    name: 'Light Protocol',
    description: 'State compression for Solana. Reduce on-chain storage costs by up to 1000x using compressed accounts.',
    docsUrl: 'https://lightprotocol.com/docs',
    color: 'secondary',
    features: ['State Compression', 'Cost Reduction', 'Scalability'],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
      </svg>
    ),
  },
  {
    name: 'Arcium',
    description: 'Multi-party computation for private smart contracts. Execute computations on encrypted data without revealing inputs.',
    docsUrl: 'https://docs.arcium.com',
    color: 'accent',
    features: ['Private Compute', 'MPC', 'Encrypted Inputs'],
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  primary: {
    bg: 'bg-primary/10',
    border: 'border-primary/30 hover:border-primary/50',
    text: 'text-primary',
    badge: 'bg-primary/20 text-primary',
  },
  secondary: {
    bg: 'bg-secondary/10',
    border: 'border-secondary/30 hover:border-secondary/50',
    text: 'text-secondary',
    badge: 'bg-secondary/20 text-secondary',
  },
  accent: {
    bg: 'bg-accent/10',
    border: 'border-accent/30 hover:border-accent/50',
    text: 'text-accent',
    badge: 'bg-accent/20 text-accent',
  },
};

export function Ecosystem() {
  return (
    <section id="ecosystem" className="px-4 py-20 sm:px-6 lg:px-8 bg-surface/30" aria-labelledby="ecosystem-title">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="ecosystem-title" className="text-3xl font-bold mb-4">
            Privacy SDK Ecosystem
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            PrivKit integrates the leading privacy protocols on Solana.
            Each SDK brings unique capabilities&mdash;we pre-configure them so you can focus on building.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {sdks.map((sdk) => {
            const colors = colorClasses[sdk.color];
            return (
              <a
                key={sdk.name}
                href={sdk.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-6 rounded-xl border ${colors.border} ${colors.bg} transition-all duration-200 hover:-translate-y-1`}
              >
                <div className={`${colors.text} mb-4`} aria-hidden="true">
                  {sdk.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {sdk.name}
                </h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                  {sdk.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {sdk.features.map((feature) => (
                    <span
                      key={feature}
                      className={`px-2 py-1 text-xs rounded-full ${colors.badge}`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-zinc-500 group-hover:text-zinc-300">
                  <span>View Documentation</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-surface border border-border rounded-xl">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center" aria-hidden="true">
              <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-white">PrivKit configures these automatically</p>
              <p className="text-sm text-zinc-500">Dependencies, types, and examples ready to use</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
