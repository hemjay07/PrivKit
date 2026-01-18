'use client';

import { CopyButton } from './CopyButton';
import { GitHubStars } from './GitHubStars';
import { NpmDownloads } from './NpmDownloads';
import { ScrollReveal } from './ScrollReveal';

export function Hero() {
  const command = 'npx create-solana-privacy-app';

  return (
    <section id="hero" className="relative px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline */}
        <ScrollReveal>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Zero to private</span>
            <br />
            in one command
          </h1>
        </ScrollReveal>

        {/* Description */}
        <ScrollReveal delay={0.1}>
          <p className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            The <span className="text-white">create-react-app</span> for Solana privacy development.
            Scaffold complete projects with Privacy Cash, Light Protocol, or Arcium
            in seconds.
          </p>
        </ScrollReveal>

        {/* Command with copy button */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex items-center bg-surface border border-border rounded-lg px-4 py-3">
              <code className="font-mono text-terminal-green text-sm sm:text-base">
                {command}
              </code>
            </div>
            <CopyButton text={command} />
          </div>
        </ScrollReveal>

        {/* Bounty badges */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge text="Privacy Tooling $15k" color="blue" />
            <Badge text="Helius $5k" color="purple" />
            <Badge text="Quicknode $3k" color="orange" />
            <Badge text="Aztec $2.5k" color="green" />
          </div>
        </ScrollReveal>

        {/* GitHub link and stars */}
        <ScrollReveal delay={0.4}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/hemjay07/PrivKit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            View on GitHub
          </a>
          <GitHubStars />
            <NpmDownloads />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Badge({ text, color }: { text: string; color: 'blue' | 'purple' | 'orange' | 'green' }) {
  const colors = {
    blue: 'bg-primary/10 text-primary border-primary/20',
    purple: 'bg-secondary/10 text-secondary border-secondary/20',
    orange: 'bg-accent/10 text-accent border-accent/20',
    green: 'bg-success/10 text-success border-success/20',
  };

  return (
    <span className={`px-3 py-1.5 min-h-[32px] inline-flex items-center text-sm rounded-full border ${colors[color]}`}>
      {text}
    </span>
  );
}
