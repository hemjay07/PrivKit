'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UnifiedPrivacy, PrivacyProvider } from '@/lib/privacy/unified';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const [selectedProvider, setSelectedProvider] = useState<PrivacyProvider>('privacy-cash');

  const providers: { id: PrivacyProvider; name: string; description: string; features: string[] }[] = [
    {
      id: 'privacy-cash',
      name: 'Privacy Cash',
      description: 'Private SOL transfers using ZK proofs',
      features: ['Shield/Withdraw SOL', 'SPL Token Support', 'Groth16 ZK-SNARKs', 'Node 24+ Required']
    },
    {
      id: 'light-protocol',
      name: 'Light Protocol',
      description: 'ZK Compression for 5000x cheaper state',
      features: ['Compressed Tokens', '5000x Cost Reduction', 'Helius RPC Required', 'SPL Compatible']
    },
    {
      id: 'arcium',
      name: 'Arcium',
      description: 'Multi-party computation for private contracts',
      features: ['MPC Network', 'Dark Pools', 'Hidden Game State', 'Anchor Required']
    }
  ];

  const comparison = UnifiedPrivacy.getFeatureComparison();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Solana <span className="text-primary">Privacy Stack</span>
          </h1>
          <p className="text-zinc-400">
            All three privacy SDKs in one project — compare, learn, and build
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center mb-8">
          <WalletMultiButton />
        </div>

        {connected && publicKey && (
          <div className="space-y-8">
            {/* Wallet Info */}
            <div className="p-4 bg-surface rounded-lg border border-border text-center">
              <p className="text-sm text-zinc-500">Connected Wallet</p>
              <p className="font-mono text-sm">{publicKey.toBase58()}</p>
            </div>

            {/* Provider Selection */}
            <div className="grid grid-cols-3 gap-4">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider.id)}
                  className={`p-4 rounded-lg border transition text-left ${
                    selectedProvider === provider.id
                      ? 'bg-primary/10 border-primary'
                      : 'bg-surface border-border hover:border-zinc-600'
                  }`}
                >
                  <h3 className="font-semibold text-lg">{provider.name}</h3>
                  <p className="text-sm text-zinc-500 mt-1">{provider.description}</p>
                </button>
              ))}
            </div>

            {/* Selected Provider Details */}
            <div className="p-6 bg-surface rounded-lg border border-border">
              <h2 className="text-xl font-semibold mb-4">
                {providers.find(p => p.id === selectedProvider)?.name} Features
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {comparison[selectedProvider].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="p-6 bg-surface rounded-lg border border-border overflow-x-auto">
              <h2 className="text-xl font-semibold mb-4">SDK Comparison</h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left p-2">Feature</th>
                    <th className="text-center p-2">Privacy Cash</th>
                    <th className="text-center p-2">Light Protocol</th>
                    <th className="text-center p-2">Arcium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-800">
                    <td className="p-2 text-zinc-400">Complexity</td>
                    <td className="p-2 text-center text-green-400">Low</td>
                    <td className="p-2 text-center text-yellow-400">Medium</td>
                    <td className="p-2 text-center text-red-400">High</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="p-2 text-zinc-400">Setup Time</td>
                    <td className="p-2 text-center">5 mins</td>
                    <td className="p-2 text-center">15 mins</td>
                    <td className="p-2 text-center">1+ hour</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="p-2 text-zinc-400">Node Version</td>
                    <td className="p-2 text-center">24+</td>
                    <td className="p-2 text-center">18+</td>
                    <td className="p-2 text-center">18+</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="p-2 text-zinc-400">RPC Required</td>
                    <td className="p-2 text-center">Standard</td>
                    <td className="p-2 text-center text-amber-400">Helius</td>
                    <td className="p-2 text-center">Standard + MPC</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-zinc-400">Best For</td>
                    <td className="p-2 text-center">Payments</td>
                    <td className="p-2 text-center">Tokens</td>
                    <td className="p-2 text-center">Computation</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-3 gap-4">
              <a
                href="https://privacycash.co"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface rounded-lg border border-border hover:border-zinc-600 transition text-center"
              >
                <p className="font-medium">Privacy Cash Docs</p>
                <p className="text-xs text-zinc-500 mt-1">→</p>
              </a>
              <a
                href="https://docs.lightprotocol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface rounded-lg border border-border hover:border-zinc-600 transition text-center"
              >
                <p className="font-medium">Light Protocol Docs</p>
                <p className="text-xs text-zinc-500 mt-1">→</p>
              </a>
              <a
                href="https://docs.arcium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface rounded-lg border border-border hover:border-zinc-600 transition text-center"
              >
                <p className="font-medium">Arcium Docs</p>
                <p className="text-xs text-zinc-500 mt-1">→</p>
              </a>
            </div>
          </div>
        )}

        {!connected && (
          <div className="text-center py-12">
            <p className="text-zinc-500">Connect your wallet to explore all privacy options</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-zinc-600">
          <p>Built with PrivKit • Full Privacy Stack • Solana</p>
        </footer>
      </div>
    </main>
  );
}
