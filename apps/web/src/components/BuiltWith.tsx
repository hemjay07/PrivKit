'use client';

const technologies = [
  {
    name: 'Solana',
    url: 'https://solana.com',
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 646 96" fill="currentColor" aria-hidden="true">
        <path d="M108.53 75.69a4.23 4.23 0 0 1-2.99 1.24h-92.6a2.12 2.12 0 0 1-1.5-3.62l14.9-14.9a4.24 4.24 0 0 1 3-1.24h92.6a2.12 2.12 0 0 1 1.5 3.62l-14.9 14.9ZM108.53 23.18a4.23 4.23 0 0 0-2.99-1.24h-92.6a2.12 2.12 0 0 0-1.5 3.62l14.9 14.9a4.24 4.24 0 0 0 3 1.24h92.6a2.12 2.12 0 0 0 1.5-3.62l-14.9-14.9ZM11.44 49.44a4.23 4.23 0 0 1 2.99-1.24h92.6a2.12 2.12 0 0 1 1.5 3.62l-14.9 14.9a4.24 4.24 0 0 1-3 1.24H.96a2.12 2.12 0 0 1-1.5-3.62l12-14.9Z" />
        <path d="M172.8 73.56c-5.56 0-10.32-1.28-14.28-3.84-3.92-2.6-6.92-6.24-9-10.92-2.08-4.72-3.12-10.2-3.12-16.44s1.04-11.68 3.12-16.32c2.08-4.68 5.08-8.28 9-10.8 3.96-2.56 8.72-3.84 14.28-3.84 5.52 0 10.24 1.28 14.16 3.84 3.96 2.52 6.96 6.12 9 10.8 2.08 4.64 3.12 10.08 3.12 16.32s-1.04 11.72-3.12 16.44c-2.04 4.68-5.04 8.32-9 10.92-3.92 2.56-8.64 3.84-14.16 3.84Zm0-11.64c3.84 0 6.8-1.56 8.88-4.68 2.12-3.16 3.18-7.76 3.18-13.8s-1.06-10.6-3.18-13.68c-2.08-3.12-5.04-4.68-8.88-4.68-3.88 0-6.88 1.56-9 4.68-2.08 3.08-3.12 7.64-3.12 13.68s1.04 10.64 3.12 13.8c2.12 3.12 5.12 4.68 9 4.68ZM218.88 73.56c-4.92 0-9.2-1.04-12.84-3.12-3.64-2.08-6.44-5.08-8.4-9-1.92-3.92-2.88-8.6-2.88-14.04V12.48h14.04v33.24c0 5.04 1.16 8.92 3.48 11.64 2.32 2.68 5.64 4.02 9.96 4.02s7.64-1.34 9.96-4.02c2.32-2.72 3.48-6.6 3.48-11.64V12.48h14.04V47.4c0 5.44-.96 10.12-2.88 14.04-1.92 3.92-4.72 6.92-8.4 9-3.68 2.08-8 3.12-12.96 3.12h-6.6ZM276.72 72.36V12.48h14.04v47.88h29.04v12h-43.08ZM339.92 72.36l24.12-59.88h15.48l24.12 59.88h-15.36l-4.44-11.76h-24l-4.44 11.76h-15.48Zm22.92-22.08h16.32l-8.16-21.72-8.16 21.72ZM416.88 72.36V12.48h12.24l28.68 37.44V12.48h13.8v59.88h-12.24l-28.68-37.44v37.44h-13.8ZM490.92 72.36l24.12-59.88h15.48l24.12 59.88h-15.36l-4.44-11.76h-24l-4.44 11.76h-15.48Zm22.92-22.08h16.32l-8.16-21.72-8.16 21.72Z" />
      </svg>
    ),
  },
  {
    name: 'Helius',
    url: 'https://helius.dev',
    logo: (
      <div className="flex items-center gap-2" aria-hidden="true">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" fill="currentColor" className="text-background" />
        </svg>
        <span className="font-bold text-lg tracking-tight">Helius</span>
      </div>
    ),
  },
  {
    name: 'Light Protocol',
    url: 'https://lightprotocol.com',
    logo: (
      <div className="flex items-center gap-2" aria-hidden="true">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
        </svg>
        <span className="font-bold text-lg tracking-tight">Light Protocol</span>
      </div>
    ),
  },
  {
    name: 'Arcium',
    url: 'https://arcium.com',
    logo: (
      <div className="flex items-center gap-2" aria-hidden="true">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <span className="font-bold text-lg tracking-tight">Arcium</span>
      </div>
    ),
  },
  {
    name: 'Privacy Cash',
    url: 'https://docs.privacycash.dev',
    logo: (
      <div className="flex items-center gap-2" aria-hidden="true">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1a4 4 0 0 0-4 4v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V5a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v3h-4V5a2 2 0 0 1 2-2z" />
        </svg>
        <span className="font-bold text-lg tracking-tight">Privacy Cash</span>
      </div>
    ),
  },
];

export function BuiltWith() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-zinc-500 text-center mb-8 uppercase tracking-wider">
          Built with
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {technologies.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:text-zinc-100 transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Built with ${tech.name}`}
            >
              {tech.logo}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
