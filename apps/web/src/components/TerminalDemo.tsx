'use client';

import { useState, useEffect, useRef } from 'react';

interface DemoLine {
  text: string;
  delay: number;
  color?: string;
}

interface DemoVariant {
  id: string;
  name: string;
  description: string;
  lines: DemoLine[];
  loopDelay: number;
}

const LOGO_LINES: DemoLine[] = [
  { text: '  ██████╗ ██████╗ ██╗██╗   ██╗██╗  ██╗██╗████████╗', delay: 200, color: 'blue' },
  { text: '  ██╔══██╗██╔══██╗██║██║   ██║██║ ██╔╝██║╚══██╔══╝', delay: 250, color: 'blue' },
  { text: '  ██████╔╝██████╔╝██║██║   ██║█████╔╝ ██║   ██║   ', delay: 300, color: 'blue' },
  { text: '  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔═██╗ ██║   ██║   ', delay: 350, color: 'blue' },
  { text: '  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██╗██║   ██║   ', delay: 400, color: 'blue' },
  { text: '  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝   ', delay: 450, color: 'blue' },
  { text: '', delay: 500 },
  { text: '  Zero to private in one command', delay: 600, color: 'dim' },
];

const SUCCESS_LINES: DemoLine[] = [
  { text: '╭──────────────────────────────────────────────────╮', delay: 0, color: 'green' },
  { text: '│  ✔ Success! Created my-app                      │', delay: 50, color: 'green' },
  { text: '╰──────────────────────────────────────────────────╯', delay: 100, color: 'green' },
  { text: '', delay: 200 },
  { text: '▸ Start development:', delay: 400, color: 'dim' },
  { text: '    cd my-app && npm run dev', delay: 500, color: 'cyan' },
  { text: '', delay: 700 },
  { text: 'Happy building with privacy! 🛡️', delay: 900, color: 'dim' },
];

const demoVariants: DemoVariant[] = [
  {
    id: 'basic',
    name: 'Interactive',
    description: 'Answer prompts step by step',
    loopDelay: 9000,
    lines: [
      { text: '$ npx create-solana-privacy-app my-app', delay: 0 },
      { text: '', delay: 1000 },
      ...LOGO_LINES.map(l => ({ ...l, delay: l.delay + 1000 })),
      { text: '', delay: 1800 },
      { text: '? What is your project name? › my-app', delay: 2000 },
      { text: '? Which privacy template? › privacy-cash', delay: 2500 },
      { text: '? Package manager? › npm', delay: 3000 },
      { text: '', delay: 3200 },
      { text: '⠋ Creating project structure...', delay: 3400, color: 'blue' },
      { text: '✔ Created project structure', delay: 4000, color: 'green' },
      { text: '✔ Installed dependencies', delay: 4500, color: 'green' },
      { text: '✔ Initialized git repository', delay: 5000, color: 'green' },
      { text: '', delay: 5200 },
      ...SUCCESS_LINES.map(l => ({ ...l, delay: l.delay + 5400 })),
    ],
  },
  {
    id: 'flags',
    name: 'With Flags',
    description: 'Skip prompts with CLI flags',
    loopDelay: 7000,
    lines: [
      { text: '$ npx create-solana-privacy-app my-app \\', delay: 0 },
      { text: '    --template light-protocol \\', delay: 100, color: 'cyan' },
      { text: '    --package-manager pnpm \\', delay: 200, color: 'cyan' },
      { text: '    --skip-install', delay: 300, color: 'cyan' },
      { text: '', delay: 800 },
      ...LOGO_LINES.map(l => ({ ...l, delay: l.delay + 800 })),
      { text: '', delay: 1600 },
      { text: '⠋ Creating project structure...', delay: 1800, color: 'blue' },
      { text: '✔ Created project structure', delay: 2300, color: 'green' },
      { text: '✔ Skipped dependency installation', delay: 2600, color: 'dim' },
      { text: '✔ Initialized git repository', delay: 2900, color: 'green' },
      { text: '', delay: 3100 },
      ...SUCCESS_LINES.map(l => ({ ...l, delay: l.delay + 3300 })),
    ],
  },
  {
    id: 'fullstack',
    name: 'Full Stack',
    description: 'All three SDKs combined',
    loopDelay: 7500,
    lines: [
      { text: '$ npx create-solana-privacy-app my-privacy-suite \\', delay: 0 },
      { text: '    --template full-stack', delay: 100, color: 'cyan' },
      { text: '', delay: 600 },
      ...LOGO_LINES.map(l => ({ ...l, delay: l.delay + 600 })),
      { text: '', delay: 1400 },
      { text: '⠋ Creating project structure...', delay: 1600, color: 'blue' },
      { text: '✔ Privacy Cash SDK configured', delay: 2100, color: 'green' },
      { text: '✔ Light Protocol SDK configured', delay: 2400, color: 'green' },
      { text: '✔ Arcium SDK configured', delay: 2700, color: 'green' },
      { text: '✔ Unified API wrapper created', delay: 3000, color: 'green' },
      { text: '✔ Installed dependencies', delay: 3500, color: 'green' },
      { text: '', delay: 3700 },
      { text: '╭──────────────────────────────────────────────────╮', delay: 3900, color: 'green' },
      { text: '│  ✔ Full-Stack privacy suite ready!              │', delay: 3950, color: 'green' },
      { text: '╰──────────────────────────────────────────────────╯', delay: 4000, color: 'green' },
      { text: '', delay: 4200 },
      { text: '▸ Compare all three SDKs at:', delay: 4400, color: 'dim' },
      { text: '    http://localhost:3000/compare', delay: 4500, color: 'cyan' },
      { text: '', delay: 4700 },
      { text: 'Happy building with privacy! 🛡️', delay: 4900, color: 'dim' },
    ],
  },
];

export function TerminalDemo() {
  const [activeVariant, setActiveVariant] = useState('basic');
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const currentVariant = demoVariants.find(v => v.id === activeVariant) || demoVariants[0];

  // Intersection Observer to detect visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset animation when variant changes
  useEffect(() => {
    setVisibleLines(0);
  }, [activeVariant]);

  // Animation effect - only runs when visible
  useEffect(() => {
    if (!isVisible) return;

    const timers: NodeJS.Timeout[] = [];

    currentVariant.lines.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    // Loop the animation
    const loopTimer = setTimeout(() => {
      setVisibleLines(0);
    }, currentVariant.loopDelay);
    timers.push(loopTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isVisible, visibleLines === 0, currentVariant]);

  const getColorClass = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'text-primary';
      case 'green':
        return 'text-success';
      case 'cyan':
        return 'text-cyan-400';
      case 'dim':
        return 'text-zinc-500';
      default:
        return 'text-zinc-300';
    }
  };

  return (
    <section id="terminal" ref={sectionRef} className="px-4 py-20 sm:px-6 lg:px-8" aria-label="Terminal demonstration">
      <div className="max-w-3xl mx-auto">
        {/* Screen reader description */}
        <p className="sr-only">
          Animated terminal demo showing the create-solana-privacy-app CLI in action.
          It demonstrates running the command, selecting a template, and seeing the success message.
        </p>

        {/* Variant tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {demoVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => setActiveVariant(variant.id)}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeVariant === variant.id
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-border text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
              }`}
            >
              <span className="font-medium">{variant.name}</span>
              <span className="hidden sm:inline text-xs ml-2 opacity-70">{variant.description}</span>
            </button>
          ))}
        </div>

        {/* Terminal window */}
        <div className="bg-surface rounded-lg border border-border overflow-hidden shadow-2xl" aria-hidden="true">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-zinc-500 font-mono">Terminal</span>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm h-[400px] overflow-hidden">
            {currentVariant.lines.slice(0, visibleLines).map((line, index) => (
              <div key={`${activeVariant}-${index}`} className={`${getColorClass(line.color)} whitespace-pre`}>
                {line.text || '\u00A0'}
              </div>
            ))}
            {/* Blinking cursor */}
            <span className="inline-block w-2 h-4 bg-terminal-green cursor-blink" />
          </div>
        </div>
      </div>
    </section>
  );
}
