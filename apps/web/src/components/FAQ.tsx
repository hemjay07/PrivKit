'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 'node-version',
    question: 'What Node.js version do I need?',
    answer: 'PrivKit requires Node.js 18 or higher. We recommend using the latest LTS version for best compatibility. You can check your version with `node --version` in your terminal.',
  },
  {
    id: 'template-differences',
    question: 'What are the differences between templates?',
    answer: 'Privacy Cash focuses on private token transfers with ZK proofs. Light Protocol specializes in state compression for cost reduction. Arcium enables private compute using MPC. The Full-Stack template combines all three for maximum flexibility.',
  },
  {
    id: 'update-cli',
    question: 'How do I update to the latest version?',
    answer: 'Simply run `npx create-solana-privacy-app@latest` to use the newest version. For global installations, run `npm update -g create-solana-privacy-app`.',
  },
  {
    id: 'helius-api',
    question: 'Do I need a Helius API key?',
    answer: 'A Helius API key is recommended for production but not required for development. Generated projects include a development RPC endpoint. Get your free API key at helius.dev for higher rate limits.',
  },
  {
    id: 'existing-project',
    question: 'Can I add privacy features to an existing project?',
    answer: 'Yes! While PrivKit is optimized for new projects, you can reference the generated code as a guide. Check the template source files in the generated project for the SDK integration patterns.',
  },
  {
    id: 'mainnet-deploy',
    question: 'Is this production-ready for mainnet?',
    answer: 'Templates are designed for development and testing. Before mainnet deployment, audit your code, secure your keys, and thoroughly test on devnet. Each SDK has specific production guidelines in their documentation.',
  },
  {
    id: 'troubleshooting',
    question: 'Installation failed - what should I do?',
    answer: 'First, ensure Node.js 18+ is installed. Try clearing npm cache with `npm cache clean --force`. If using pnpm or yarn, ensure they\'re up to date. Check our GitHub issues for known problems or open a new issue.',
  },
  {
    id: 'wallet-support',
    question: 'Which wallets are supported?',
    answer: 'All templates include Solana wallet adapter supporting Phantom, Solflare, Backpack, and other major wallets. The wallet integration is pre-configured and ready to use out of the box.',
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="faq-title">
      <div className="max-w-3xl mx-auto">
        <h2 id="faq-title" className="text-3xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-zinc-400 text-center mb-12">
          Quick answers to common questions about PrivKit
        </p>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FAQAccordion
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => toggleFAQ(faq.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500 mb-4">Still have questions?</p>
          <a
            href="https://github.com/hemjay07/PrivKit/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors duration-150"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            Open an Issue on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

interface FAQAccordionProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQAccordion({ faq, isOpen, onToggle }: FAQAccordionProps) {
  return (
    <div
      id={`faq-${faq.id}`}
      className="bg-surface border border-border rounded-lg overflow-hidden transition-colors duration-150 hover:border-zinc-600"
    >
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="font-medium text-zinc-200 pr-4">{faq.question}</span>
        <span
          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-zinc-800 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${faq.id}`}
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="region"
        aria-labelledby={`faq-${faq.id}`}
      >
        <div className="px-5 pb-4 text-zinc-400 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
