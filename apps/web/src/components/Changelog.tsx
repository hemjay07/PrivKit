'use client';

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
  type: 'major' | 'minor' | 'patch';
}

const changelog: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2025-01-15',
    title: 'Initial Release',
    type: 'major',
    changes: [
      'Four privacy templates: Privacy Cash, Light Protocol, Arcium, Full-Stack',
      'Interactive CLI with smart prompts',
      'TypeScript, ESLint, and Prettier pre-configured',
      'Helius RPC integration included',
    ],
  },
  {
    version: '0.9.0',
    date: '2025-01-10',
    title: 'Beta Release',
    type: 'minor',
    changes: [
      'Full-Stack template combining all SDKs',
      'Improved error handling and validation',
      'Added --skip-install and --skip-git flags',
    ],
  },
  {
    version: '0.8.0',
    date: '2025-01-05',
    title: 'Template Improvements',
    type: 'minor',
    changes: [
      'Added Arcium MPC template',
      'Wallet adapter integration for all templates',
      'Example components for each SDK',
    ],
  },
  {
    version: '0.7.0',
    date: '2024-12-28',
    title: 'Light Protocol Support',
    type: 'minor',
    changes: [
      'Light Protocol template for state compression',
      'Compressed account examples',
      'Cost comparison documentation',
    ],
  },
];

const typeColors = {
  major: 'bg-success/20 text-success border-success/30',
  minor: 'bg-primary/20 text-primary border-primary/30',
  patch: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

const typeLabels = {
  major: 'Major',
  minor: 'Minor',
  patch: 'Patch',
};

export function Changelog() {
  return (
    <section id="changelog" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="changelog-title">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="changelog-title" className="text-3xl font-bold mb-4">
            Recent Updates
          </h2>
          <p className="text-zinc-400">
            Actively maintained with regular improvements and new features
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

          <div className="space-y-8">
            {changelog.map((entry, index) => (
              <div key={entry.version} className="relative pl-12">
                {/* Timeline dot */}
                <div
                  className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                    index === 0 ? 'bg-success border-success' : 'bg-surface border-border'
                  }`}
                  aria-hidden="true"
                />

                <div className="bg-surface border border-border rounded-lg p-5 hover:border-zinc-600 transition-colors duration-150">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="font-mono text-lg font-semibold text-white">
                      v{entry.version}
                    </span>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${typeColors[entry.type]}`}>
                      {typeLabels[entry.type]}
                    </span>
                    <span className="text-sm text-zinc-500">{entry.date}</span>
                  </div>

                  <h3 className="font-medium text-zinc-200 mb-3">{entry.title}</h3>

                  <ul className="space-y-2">
                    {entry.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <svg className="w-4 h-4 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://github.com/hemjay07/PrivKit/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150"
          >
            View full changelog on GitHub
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
