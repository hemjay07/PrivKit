'use client';

import { useState, useEffect } from 'react';

interface CodeFile {
  name: string;
  language: string;
  code: string;
}

interface CodePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  files: CodeFile[];
}

const codeSnippets: Record<string, CodeFile[]> = {
  'privacy-cash': [
    {
      name: 'package.json',
      language: 'json',
      code: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest"
  },
  "dependencies": {
    "@solana/web3.js": "^1.95.0",
    "@solana/wallet-adapter-react": "^0.15.35",
    "@privacycash/sdk": "^0.2.0",
    "next": "14.2.0",
    "react": "^18.2.0"
  }
}`,
    },
    {
      name: 'lib/privacy-cash.ts',
      language: 'typescript',
      code: `import { PrivacyCash, ProofGenerator } from '@privacycash/sdk';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!);
const privacyCash = new PrivacyCash(connection);

export async function createPrivateTransfer(
  amount: number,
  recipient: PublicKey,
  wallet: PublicKey
) {
  // Generate ZK proof for private transfer
  const proof = await ProofGenerator.createTransferProof({
    amount,
    recipient,
    sender: wallet,
  });

  // Execute private transfer
  const tx = await privacyCash.transfer({
    proof,
    amount,
    recipient,
  });

  return tx;
}`,
    },
    {
      name: 'components/PrivacyTransfer.tsx',
      language: 'typescript',
      code: `'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { createPrivateTransfer } from '@/lib/privacy-cash';

export function PrivacyTransfer() {
  const { publicKey, signTransaction } = useWallet();
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTransfer = async () => {
    if (!publicKey) return;
    setLoading(true);

    try {
      const tx = await createPrivateTransfer(
        parseFloat(amount),
        new PublicKey(recipient),
        publicKey
      );
      console.log('Transfer complete:', tx);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2>Private Transfer</h2>
      {/* Form fields... */}
    </div>
  );
}`,
    },
  ],
  'light-protocol': [
    {
      name: 'package.json',
      language: 'json',
      code: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "@solana/web3.js": "^1.95.0",
    "@lightprotocol/stateless.js": "^0.14.0",
    "@lightprotocol/compressed-token": "^0.8.0",
    "next": "14.2.0",
    "react": "^18.2.0"
  }
}`,
    },
    {
      name: 'lib/light-protocol.ts',
      language: 'typescript',
      code: `import { Rpc, createRpc } from '@lightprotocol/stateless.js';
import { CompressedTokenProgram } from '@lightprotocol/compressed-token';

const RPC_ENDPOINT = process.env.NEXT_PUBLIC_HELIUS_RPC!;
export const connection: Rpc = createRpc(RPC_ENDPOINT, RPC_ENDPOINT);

export async function mintCompressedTokens(
  mint: PublicKey,
  amount: number,
  recipient: PublicKey
) {
  // Mint compressed tokens with 5000x lower cost
  const tx = await CompressedTokenProgram.mintTo({
    mint,
    amount,
    destination: recipient,
  });

  return tx;
}`,
    },
  ],
  'arcium': [
    {
      name: 'package.json',
      language: 'json',
      code: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "@solana/web3.js": "^1.95.0",
    "@arcium/client": "^0.1.0",
    "@coral-xyz/anchor": "^0.30.0",
    "next": "14.2.0",
    "react": "^18.2.0"
  }
}`,
    },
    {
      name: 'lib/arcium.ts',
      language: 'typescript',
      code: `import { ArciumClient, MpcCluster } from '@arcium/client';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL!);
const arcium = new ArciumClient(connection);

export async function executePrivateCompute(
  programId: PublicKey,
  inputs: number[],
  wallet: PublicKey
) {
  // Connect to MPC cluster
  const cluster = await MpcCluster.connect();

  // Submit private computation
  const result = await arcium.compute({
    program: programId,
    inputs: inputs.map(i => cluster.encrypt(i)),
    payer: wallet,
  });

  // Decrypt result
  return cluster.decrypt(result);
}`,
    },
  ],
  'full-stack': [
    {
      name: 'package.json',
      language: 'json',
      code: `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "dependencies": {
    "@solana/web3.js": "^1.95.0",
    "@privacycash/sdk": "^0.2.0",
    "@lightprotocol/stateless.js": "^0.14.0",
    "@arcium/client": "^0.1.0",
    "next": "14.2.0",
    "react": "^18.2.0"
  }
}`,
    },
    {
      name: 'lib/unified-api.ts',
      language: 'typescript',
      code: `import { PrivacyCash } from '@privacycash/sdk';
import { createRpc } from '@lightprotocol/stateless.js';
import { ArciumClient } from '@arcium/client';

export type PrivacyProvider = 'privacy-cash' | 'light' | 'arcium';

export class UnifiedPrivacyAPI {
  private provider: PrivacyProvider;

  constructor(provider: PrivacyProvider) {
    this.provider = provider;
  }

  async privateTransfer(params: TransferParams) {
    switch (this.provider) {
      case 'privacy-cash':
        return this.privacyCashTransfer(params);
      case 'light':
        return this.lightTransfer(params);
      case 'arcium':
        return this.arciumTransfer(params);
    }
  }

  // Implementation for each provider...
}`,
    },
  ],
};

export function CodePreviewModal({ isOpen, onClose, templateName, files }: CodePreviewModalProps) {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setActiveTab(0);
  }, [templateName]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[80vh] bg-surface border border-border rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h3 className="font-semibold text-zinc-200">
            {templateName} Template
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 py-2 border-b border-border overflow-x-auto">
          {files.map((file, index) => (
            <button
              key={file.name}
              onClick={() => setActiveTab(index)}
              className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap transition-colors ${
                activeTab === index
                  ? 'bg-primary/20 text-primary'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>

        {/* Code content */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap">
            <code>{files[activeTab]?.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export function getCodeSnippets(templateId: string): CodeFile[] {
  return codeSnippets[templateId] || [];
}
