'use client';

import { useState } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  description?: string;
  children?: FileNode[];
}

const templateFiles: Record<string, FileNode[]> = {
  'privacy-cash': [
    {
      name: 'src/',
      type: 'folder',
      children: [
        { name: 'app/', type: 'folder', children: [
          { name: 'page.tsx', type: 'file', description: 'Main app page with wallet connect' },
          { name: 'layout.tsx', type: 'file' },
          { name: 'globals.css', type: 'file' },
        ]},
        { name: 'components/', type: 'folder', children: [
          { name: 'PrivacyTransfer.tsx', type: 'file', description: 'ZK transfer component' },
          { name: 'WalletButton.tsx', type: 'file', description: 'Wallet connection UI' },
          { name: 'TransactionHistory.tsx', type: 'file' },
        ]},
        { name: 'lib/', type: 'folder', children: [
          { name: 'privacy-cash.ts', type: 'file', description: 'Privacy Cash SDK wrapper' },
          { name: 'wallet.ts', type: 'file' },
        ]},
      ],
    },
    { name: 'package.json', type: 'file', description: 'Pre-configured dependencies' },
    { name: 'tsconfig.json', type: 'file' },
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

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const isFolder = node.type === 'folder';

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1 hover:bg-zinc-800/50 rounded px-1"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        {isFolder ? (
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 text-zinc-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        )}
        <span className={`text-sm ${isFolder ? 'text-zinc-200' : 'text-zinc-400'}`}>
          {node.name}
        </span>
        {node.description && (
          <span className="text-xs text-zinc-600 ml-2">
            {node.description}
          </span>
        )}
      </div>
      {isFolder && node.children?.map((child, idx) => (
        <FileTreeNode key={idx} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export function TemplatePreview() {
  const [activeTemplate, setActiveTemplate] = useState('privacy-cash');

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">See What You Get</h2>
        <p className="text-zinc-400 text-center mb-8">
          Preview the generated file structure before running the CLI.
        </p>

        {/* Template tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplate(template.id)}
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
          <div className="max-h-[300px] overflow-y-auto">
            {templateFiles[activeTemplate]?.map((node, idx) => (
              <FileTreeNode key={idx} node={node} />
            ))}
          </div>
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
