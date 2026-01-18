'use client';

import { useState, useEffect, useRef } from 'react';

const DEMO_LINES = [
  { text: '$ npx create-solana-privacy-app my-app', delay: 0 },
  { text: '', delay: 1000 },
  { text: '  ██████╗ ██████╗ ██╗██╗   ██╗██╗  ██╗██╗████████╗', delay: 1200, color: 'blue' },
  { text: '  ██╔══██╗██╔══██╗██║██║   ██║██║ ██╔╝██║╚══██╔══╝', delay: 1250, color: 'blue' },
  { text: '  ██████╔╝██████╔╝██║██║   ██║█████╔╝ ██║   ██║   ', delay: 1300, color: 'blue' },
  { text: '  ██╔═══╝ ██╔══██╗██║╚██╗ ██╔╝██╔═██╗ ██║   ██║   ', delay: 1350, color: 'blue' },
  { text: '  ██║     ██║  ██║██║ ╚████╔╝ ██║  ██╗██║   ██║   ', delay: 1400, color: 'blue' },
  { text: '  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝  ╚═╝  ╚═╝╚═╝   ╚═╝   ', delay: 1450, color: 'blue' },
  { text: '', delay: 1500 },
  { text: '  Zero to private in one command', delay: 1600, color: 'dim' },
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
  { text: '╭──────────────────────────────────────────────────╮', delay: 5400, color: 'green' },
  { text: '│  ✔ Success! Created my-app                      │', delay: 5450, color: 'green' },
  { text: '╰──────────────────────────────────────────────────╯', delay: 5500, color: 'green' },
  { text: '', delay: 5600 },
  { text: '▸ Start development:', delay: 5800, color: 'dim' },
  { text: '    cd my-app && npm run dev', delay: 5900, color: 'cyan' },
  { text: '', delay: 6100 },
  { text: '▸ Read the docs:', delay: 6200, color: 'dim' },
  { text: '    https://github.com/hemjay07/PrivKit#readme', delay: 6300, color: 'cyan' },
  { text: '', delay: 6500 },
  { text: '▸ Get help:', delay: 6600, color: 'dim' },
  { text: '    https://github.com/hemjay07/PrivKit/issues', delay: 6700, color: 'cyan' },
  { text: '', delay: 6900 },
  { text: 'Happy building with privacy! 🛡️', delay: 7100, color: 'dim' },
];

export function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Animation effect - only runs when visible
  useEffect(() => {
    if (!isVisible) return;

    const timers: NodeJS.Timeout[] = [];

    DEMO_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
      timers.push(timer);
    });

    // Loop the animation
    const loopTimer = setTimeout(() => {
      setVisibleLines(0);
    }, 9000);
    timers.push(loopTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isVisible, visibleLines === 0]);

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
    <section id="terminal" ref={sectionRef} className="px-4 py-16 sm:px-6 lg:px-8" aria-label="Terminal demonstration">
      <div className="max-w-3xl mx-auto">
        {/* Screen reader description */}
        <p className="sr-only">
          Animated terminal demo showing the create-solana-privacy-app CLI in action.
          It demonstrates running the command, selecting a template, and seeing the success message.
        </p>
        {/* Terminal window */}
        <div className="bg-[#1a1a1a] rounded-lg border border-zinc-700 overflow-hidden shadow-2xl" aria-hidden="true">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-sm text-zinc-500 font-mono">Terminal</span>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm h-[400px] overflow-hidden">
            {DEMO_LINES.slice(0, visibleLines).map((line, index) => (
              <div key={index} className={`${getColorClass(line.color)} whitespace-pre`}>
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
