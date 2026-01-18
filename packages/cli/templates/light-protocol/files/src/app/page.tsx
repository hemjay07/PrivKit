'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  createLightConnection,
  createCompressedMint,
  mintCompressedTokens,
  transferCompressed,
  getCompressedBalances
} from '@/lib/privacy/light-protocol';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  const [mintAddress, setMintAddress] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('1000000000');
  const [balances, setBalances] = useState<Array<{mint: string; balance: number}>>([]);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || '';

  const handleCreateMint = async () => {
    if (!publicKey) return;
    setLoading(true);
    setStatus('Creating compressed token mint...');

    try {
      const tempPayer = Keypair.generate();
      setStatus('Demo: Creating mint requires funded keypair. See docs.');
      setMintAddress('DEMO_MINT_' + Date.now());
      setStatus('Demo mint created! In production, this would be a real compressed token.');
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckBalances = async () => {
    if (!publicKey) return;
    setLoading(true);
    setStatus('Fetching compressed token balances...');

    try {
      const rpc = createLightConnection(rpcUrl);
      const result = await getCompressedBalances(rpc, publicKey);
      setBalances(result);
      setStatus(`Found ${result.length} compressed token balance(s)`);
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Light Protocol <span className="text-primary">Demo</span>
          </h1>
          <p className="text-zinc-400">
            ZK Compression for Solana - up to 5000x cheaper state
          </p>
          <p className="text-sm text-amber-500 mt-2">
            Requires Helius RPC (standard RPC will not work)
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

            <div className="p-4 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">Create Compressed Token</h2>
              <button
                onClick={handleCreateMint}
                disabled={loading}
                className="w-full p-3 bg-primary hover:bg-primary/90 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Creating...' : 'Create Compressed Mint'}
              </button>
              {mintAddress && (
                <p className="mt-2 text-sm text-accent font-mono truncate">
                  Mint: {mintAddress}
                </p>
              )}
            </div>

            <div className="p-4 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">Transfer Compressed Tokens</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-zinc-400">Recipient Address</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full p-3 bg-zinc-800 rounded-lg border border-border focus:border-primary outline-none font-mono text-sm"
                    placeholder="Enter Solana address..."
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400">Amount (with decimals)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 bg-zinc-800 rounded-lg border border-border focus:border-primary outline-none"
                  />
                </div>
                <button
                  disabled={loading || !mintAddress || !recipient}
                  className="w-full p-3 bg-accent hover:bg-accent/90 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Transfer Compressed Tokens
                </button>
              </div>
            </div>

            <div className="p-4 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">Compressed Token Balances</h2>
              <button
                onClick={handleCheckBalances}
                disabled={loading}
                className="w-full p-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg font-medium disabled:opacity-50 transition mb-4"
              >
                {loading ? 'Loading...' : 'Check Balances'}
              </button>
              {balances.length > 0 ? (
                <div className="space-y-2">
                  {balances.map((b, i) => (
                    <div key={i} className="p-2 bg-zinc-800 rounded text-sm">
                      <p className="font-mono truncate">{b.mint}</p>
                      <p className="text-accent">{b.balance.toLocaleString()} tokens</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-sm">No compressed tokens found</p>
              )}
            </div>

            {status && (
              <div className={`p-4 rounded-lg ${
                status.includes('created') || status.includes('Found')
                  ? 'bg-accent/10 border border-accent/20 text-accent'
                  : status.includes('Error')
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                  : 'bg-surface border border-border text-zinc-300'
              }`}>
                <p className="text-sm">{status}</p>
              </div>
            )}

            <div className="mt-12 p-6 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">How Light Protocol Works</h2>
              <div className="space-y-3 text-sm text-zinc-400">
                <div className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span><strong className="text-zinc-200">ZK Compression</strong> - State is compressed using zero-knowledge proofs.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span><strong className="text-zinc-200">5000x Cheaper</strong> - Compressed accounts cost a fraction of regular accounts.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span><strong className="text-zinc-200">Compatible</strong> - Compressed tokens can decompress to standard SPL tokens.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!connected && (
          <div className="text-center py-12">
            <p className="text-zinc-500">Connect your wallet to get started</p>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-zinc-600">
          <p>Built with PrivKit - Light Protocol SDK - Solana</p>
        </footer>
      </div>
    </main>
  );
}
