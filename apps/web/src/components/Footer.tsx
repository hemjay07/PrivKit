'use client';

export function Footer() {
  return (
    <footer className="px-4 py-12 sm:px-6 lg:px-8 bg-surface/30 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 1a4 4 0 0 0-4 4v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V5a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v3h-4V5a2 2 0 0 1 2-2z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-xl">PrivKit</div>
              <p className="text-sm text-zinc-500">Zero to private in one command</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/hemjay07/PrivKit"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/create-solana-privacy-app"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-400 hover:text-white transition-colors duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="npm"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
              </svg>
            </a>
          </div>

          {/* MIT License */}
          <div className="text-sm text-zinc-500">
            MIT License © {new Date().getFullYear()}
          </div>
        </div>

        {/* Hackathon targets */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-zinc-500 mb-4">Built for hackathon success</p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
              Privacy Tooling $15k
            </span>
            <span className="text-xs px-3 py-1 bg-secondary/10 text-secondary rounded-full">
              Helius $5k
            </span>
            <span className="text-xs px-3 py-1 bg-accent/10 text-accent rounded-full">
              Quicknode $3k
            </span>
            <span className="text-xs px-3 py-1 bg-success/10 text-success rounded-full">
              Aztec $2.5k
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
