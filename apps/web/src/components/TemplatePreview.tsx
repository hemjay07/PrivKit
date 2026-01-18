'use client';

import { useState } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  description?: string;
  badge?: 'typescript' | 'tests' | 'wallet';
  children?: FileNode[];
}

const templateFiles: Record<string, FileNode[]> = {
  'privacy-cash': [
    {
      name: 'src/',
      type: 'folder',
      children: [
        { name: 'app/', type: 'folder', children: [
          { name: 'page.tsx', type: 'file', description: 'Main app page with wallet connect', badge: 'wallet' },
          { name: 'layout.tsx', type: 'file' },
          { name: 'globals.css', type: 'file' },
        ]},
        { name: 'components/', type: 'folder', children: [
          { name: 'PrivacyTransfer.tsx', type: 'file', description: 'ZK transfer component' },
          { name: 'WalletButton.tsx', type: 'file', description: 'Wallet connection UI', badge: 'wallet' },
          { name: 'TransactionHistory.tsx', type: 'file' },
        ]},
        { name: 'lib/', type: 'folder', children: [
          { name: 'privacy-cash.ts', type: 'file', description: 'Privacy Cash SDK wrapper' },
          { name: 'wallet.ts', type: 'file' },
        ]},
        { name: '__tests__/', type: 'folder', children: [
          { name: 'privacy.test.ts', type: 'file', description: 'Privacy transfer tests', badge: 'tests' },
        ]},
      ],
    },
    { name: 'package.json', type: 'file', description: 'Pre-configured dependencies' },
    { name: 'tsconfig.json', type: 'file', description: 'Strict TypeScript config', badge: 'typescript' },
    { name: 'vitest.config.ts', type: 'file', description: 'Test configuration', badge: 'tests' },
    { name: '.env.example', type: 'file', description: 'Environment template' },
  ],
  'light-protocol': [
    {
      name: 'src/',
      type: 'folder',
      children: [
        { name: 'app/', type: 'folder', children: [
          { name: 'page.tsx', type: 'file', description: 'Compression demo page' },
          { name: 'layout.tsx', type: 'file' },
        ]},
        { name: 'components/', type: 'folder', children: [
          { name: 'CompressedMint.tsx', type: 'file', description: 'ZK compressed token minting' },
          { name: 'CompressionStats.tsx', type: 'file', description: 'Savings calculator' },
          { name: 'WalletButton.tsx', type: 'file' },
        ]},
        { name: 'lib/', type: 'folder', children: [
          { name: 'light-protocol.ts', type: 'file', description: 'Light Protocol SDK setup' },
          { name: 'helius.ts', type: 'file', description: 'Helius RPC configuration' },
        ]},
      ],
    },
    { name: 'package.json', type: 'file', description: 'Light + Helius dependencies' },
    { name: '.env.example', type: 'file' },
  ],
  'arcium': [
    {
      name: 'src/',
      type: 'folder',
      children: [
        { name: 'app/', type: 'folder', children: [
          { name: 'page.tsx', type: 'file', description: 'MPC demo interface' },
          { name: 'layout.tsx', type: 'file' },
        ]},
        { name: 'components/', type: 'folder', children: [
          { name: 'SecretCompute.tsx', type: 'file', description: 'MPC computation UI' },
          { name: 'ArciumStatus.tsx', type: 'file', description: 'Network status' },
          { name: 'WalletButton.tsx', type: 'file' },
        ]},
        { name: 'lib/', type: 'folder', children: [
          { name: 'arcium.ts', type: 'file', description: 'Arcium MPC client' },
        ]},
      ],
    },
    { name: 'programs/', type: 'folder', description: 'Anchor smart contracts', children: [
      { name: 'arcium-example/', type: 'folder' },
    ]},
    { name: 'package.json', type: 'file' },
    { name: 'Anchor.toml', type: 'file', description: 'Anchor configuration' },
  ],
  'full-stack': [
    {
      name: 'src/',
      type: 'folder',
      children: [
        { name: 'app/', type: 'folder', children: [
          { name: 'page.tsx', type: 'file', description: 'SDK comparison dashboard' },
          { name: 'privacy-cash/', type: 'folder' },
          { name: 'light-protocol/', type: 'folder' },
          { name: 'arcium/', type: 'folder' },
        ]},
        { name: 'components/', type: 'folder', children: [
          { name: 'SDKSwitcher.tsx', type: 'file', description: 'Toggle between SDKs' },
          { name: 'FeatureMatrix.tsx', type: 'file', description: 'Compare features' },
        ]},
        { name: 'lib/', type: 'folder', children: [
          { name: 'privacy-cash.ts', type: 'file' },
          { name: 'light-protocol.ts', type: 'file' },
          { name: 'arcium.ts', type: 'file' },
          { name: 'unified-api.ts', type: 'file', description: 'Unified privacy interface' },
        ]},
      ],
    },
    { name: 'package.json', type: 'file', description: 'All three SDKs included' },
  ],
};

const templates = [
  { id: 'privacy-cash', name: 'Privacy Cash', color: 'primary' },
  { id: 'light-protocol', name: 'Light Protocol', color: 'secondary' },
  { id: 'arcium', name: 'Arcium', color: 'accent' },
  { id: 'full-stack', name: 'Full Stack', color: 'success' },
];

const badgeStyles = {
  typescript: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'TS' },
  tests: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'Test' },
  wallet: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Wallet' },
};

function FileTreeNode({ node, depth = 0, isAnimated = false }: { node: FileNode; depth?: number; isAnimated?: boolean }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const isFolder = node.type === 'folder';

  return (
    <div className={isAnimated ? 'animate-fadeIn' : ''} style={{ animationDelay: `${depth * 50}ms` }}>
      <div
        className="group relative flex items-center gap-2 py-1.5 hover:bg-zinc-800/50 rounded px-1 cursor-pointer transition-colors duration-150"
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={() => isFolder && setIsExpanded(!isExpanded)}
        onMouseEnter={() => node.description && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {isFolder ? (
          <>
            <svg
              className={`w-3 h-3 text-zinc-500 transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </>
        ) : (
          <>
            <span className="w-3" />
            <svg className="w-4 h-4 text-zinc-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </>
        )}
        <span className={`text-sm ${isFolder ? 'text-zinc-200' : 'text-zinc-400'}`}>
          {node.name}
        </span>
        {node.badge && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded ${badgeStyles[node.badge].bg} ${badgeStyles[node.badge].text}`}>
            {badgeStyles[node.badge].label}
          </span>
        )}
        {/* Tooltip */}
        {showTooltip && node.description && (
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-10 px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-xs text-zinc-300 whitespace-nowrap shadow-lg">
            {node.description}
          </div>
        )}
      </div>
      {isFolder && isExpanded && node.children?.map((child, idx) => (
        <FileTreeNode key={idx} node={child} depth={depth + 1} isAnimated={isAnimated} />
      ))}
    </div>
  );
}

export function TemplatePreview() {
  const [activeTemplate, setActiveTemplate] = useState('privacy-cash');
  const [animationKey, setAnimationKey] = useState(0);

  const handleTemplateChange = (templateId: string) => {
    setActiveTemplate(templateId);
    setAnimationKey(prev => prev + 1);
  };

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">See What You Get</h2>
        <p className="text-zinc-400 text-center mb-8">
          Preview the generated file structure before running the CLI.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <FeatureBadge icon="typescript" label="TypeScript Configured" />
          <FeatureBadge icon="tests" label="Tests Included" />
          <FeatureBadge icon="wallet" label="Wallet Ready" />
        </div>

        {/* Template tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors duration-150 ${
                activeTemplate === template.id
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-border text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>

        {/* File tree */}
        <div className="bg-surface border border-border rounded-lg p-4 font-mono text-sm">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border">
            <span className="text-zinc-400">my-app/</span>
            <span className="text-xs text-zinc-600">
              ({templates.find(t => t.id === activeTemplate)?.name} template)
            </span>
          </div>
          <div className="max-h-[350px] overflow-y-auto" key={animationKey}>
            {templateFiles[activeTemplate]?.map((node, idx) => (
              <FileTreeNode key={idx} node={node} isAnimated />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <span className={`px-1.5 py-0.5 rounded ${badgeStyles.typescript.bg} ${badgeStyles.typescript.text}`}>TS</span>
            TypeScript
          </span>
          <span className="flex items-center gap-1">
            <span className={`px-1.5 py-0.5 rounded ${badgeStyles.tests.bg} ${badgeStyles.tests.text}`}>Test</span>
            Tests
          </span>
          <span className="flex items-center gap-1">
            <span className={`px-1.5 py-0.5 rounded ${badgeStyles.wallet.bg} ${badgeStyles.wallet.text}`}>Wallet</span>
            Wallet Integration
          </span>
        </div>

        {/* Run command */}
        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500 mb-2">Generate this structure with:</p>
          <code className="inline-block bg-zinc-800 px-4 py-2 rounded-lg font-mono text-terminal-green text-sm">
            npx create-solana-privacy-app -t {activeTemplate}
          </code>
        </div>
      </div>
    </section>
  );
}

function FeatureBadge({ icon, label }: { icon: 'typescript' | 'tests' | 'wallet'; label: string }) {
  const icons = {
    typescript: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
    tests: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    wallet: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-border rounded-full text-sm">
      <span className={badgeStyles[icon].text}>{icons[icon]}</span>
      <span className="text-zinc-300">{label}</span>
    </div>
  );
}
