'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [status, setStatus] = useState<string>('');

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Arcium <span className="text-primary">MPC Demo</span>
          </h1>
          <p className="text-zinc-400">
            Multi-party computation for private smart contracts on Solana
          </p>
          <p className="text-sm text-amber-500 mt-2">
            Warning: Advanced - Full integration requires Anchor program
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <WalletMultiButton />
        </div>

        {connected && publicKey && (
          <div className="space-y-6">
            <div className="p-4 bg-surface rounded-lg border border-border">
              <p className="text-sm text-zinc-500">Connected Wallet</p>
              <p className="font-mono text-sm truncate">{publicKey.toBase58()}</p>
            </div>

            <div className="p-6 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">Arcium Architecture</h2>
              <div className="space-y-4 text-sm text-zinc-400">
                <p>
                  Arcium uses Multi-Party Computation (MPC) to enable private smart contracts.
                  Data is encrypted client-side, processed by a distributed network of MPC nodes,
                  and results are verified on-chain.
                </p>

                <div className="p-4 bg-zinc-800 rounded-lg">
                  <p className="text-zinc-300 font-medium mb-2">Integration Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Custom Anchor program with <code>#[arcium]</code> macros</li>
                    <li>MPC cluster configuration</li>
                    <li>Encryption cipher setup</li>
                    <li>Callback server for large computations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">Use Cases</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-800 rounded-lg">
                  <h3 className="font-medium text-zinc-200">Dark Pools</h3>
                  <p className="text-xs text-zinc-500 mt-1">Private order matching</p>
                </div>
                <div className="p-4 bg-zinc-800 rounded-lg">
                  <h3 className="font-medium text-zinc-200">Hidden Game State</h3>
                  <p className="text-xs text-zinc-500 mt-1">Private player data</p>
                </div>
                <div className="p-4 bg-zinc-800 rounded-lg">
                  <h3 className="font-medium text-zinc-200">Private Voting</h3>
                  <p className="text-xs text-zinc-500 mt-1">Secret ballots</p>
                </div>
                <div className="p-4 bg-zinc-800 rounded-lg">
                  <h3 className="font-medium text-zinc-200">Sealed Bids</h3>
                  <p className="text-xs text-zinc-500 mt-1">Auction privacy</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">Demo Actions</h2>
              <p className="text-sm text-zinc-500 mb-4">
                This template provides the client-side setup. For full MPC functionality,
                you'll need to deploy an Anchor program with Arcium integration.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setStatus('Encryption demo: Data would be encrypted client-side')}
                  className="p-3 bg-primary hover:bg-primary/90 rounded-lg font-medium transition"
                >
                  Demo Encrypt
                </button>
                <button
                  onClick={() => setStatus('MPC demo: Computation would be sent to MPC nodes')}
                  className="p-3 bg-accent hover:bg-accent/90 rounded-lg font-medium transition"
                >
                  Demo Compute
                </button>
              </div>
            </div>

            {status && (
              <div className="p-4 rounded-lg bg-surface border border-border">
                <p className="text-sm text-zinc-300">{status}</p>
              </div>
            )}

            <div className="p-6 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">Resources</h2>
              <div className="space-y-2 text-sm">
                <a
                  href="https://docs.arcium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  Arcium Documentation
                </a>
                <a
                  href="https://github.com/arcium-hq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  Arcium GitHub
                </a>
                <a
                  href="https://docs.arcium.com/developers/examples"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  Example Programs
                </a>
              </div>
            </div>
          </div>
        )}

        {!connected && (
          <div className="text-center py-12">
            <p className="text-zinc-500">Connect your wallet to explore</p>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-zinc-600">
          <p>Built with PrivKit - Arcium SDK - Solana</p>
        </footer>
      </div>
    </main>
  );
}
