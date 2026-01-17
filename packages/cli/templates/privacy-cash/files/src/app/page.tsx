'use client';

import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { deposit, withdraw, getPrivateBalance } from '@/lib/privacy/privacy-cash';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  const [amount, setAmount] = useState('0.1');
  const [recipient, setRecipient] = useState('');
  const [privateBalance, setPrivateBalance] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!publicKey) return;
    setLoading(true);
    setStatus('Depositing SOL to privacy pool...');

    try {
      const lamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);
      const result = await deposit(connection, publicKey, lamports);
      setStatus(`✔ Deposited! Save your note securely.`);
      console.log('Deposit note:', result);
    } catch (error) {
      setStatus(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!publicKey || !recipient) return;
    setLoading(true);
    setStatus('Withdrawing from privacy pool...');

    try {
      const lamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);
      // Note: In real usage, you'd use the note from deposit
      await withdraw(connection, publicKey, lamports, recipient);
      setStatus('✔ Withdrawn successfully!');
    } catch (error) {
      setStatus(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const checkBalance = async () => {
    if (!publicKey) return;
    setLoading(true);

    try {
      const balance = await getPrivateBalance(connection, publicKey.toBase58());
      setPrivateBalance(balance / LAMPORTS_PER_SOL);
      setStatus(`Private balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } catch (error) {
      setStatus(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Privacy Cash <span className="text-primary">Demo</span>
          </h1>
          <p className="text-zinc-400">
            Shield, withdraw, and transfer SOL privately using zero-knowledge proofs
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="flex justify-center mb-8">
          <WalletMultiButton />
        </div>

        {connected && publicKey && (
          <div className="space-y-6">
            {/* Wallet Info */}
            <div className="p-4 bg-surface rounded-lg border border-border">
              <p className="text-sm text-zinc-500">Connected Wallet</p>
              <p className="font-mono text-sm truncate">{publicKey.toBase58()}</p>
              {privateBalance !== null && (
                <p className="text-sm text-accent mt-2">
                  Private Balance: {privateBalance} SOL
                </p>
              )}
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Amount (SOL)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-surface rounded-lg border border-border focus:border-primary outline-none"
                placeholder="0.1"
              />
            </div>

            {/* Recipient Input (for withdrawals) */}
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Recipient Address (for withdrawal)</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-3 bg-surface rounded-lg border border-border focus:border-primary outline-none font-mono text-sm"
                placeholder="Enter Solana address..."
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={handleDeposit}
                disabled={loading || !amount}
                className="p-3 bg-primary hover:bg-primary/90 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? '...' : 'Shield'}
              </button>
              <button
                onClick={handleWithdraw}
                disabled={loading || !amount || !recipient}
                className="p-3 bg-accent hover:bg-accent/90 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? '...' : 'Withdraw'}
              </button>
              <button
                onClick={checkBalance}
                disabled={loading}
                className="p-3 bg-surface hover:bg-zinc-800 border border-border rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? '...' : 'Balance'}
              </button>
            </div>

            {/* Status */}
            {status && (
              <div className={`p-4 rounded-lg ${
                status.includes('✔')
                  ? 'bg-accent/10 border border-accent/20 text-accent'
                  : status.includes('✗')
                  ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                  : 'bg-surface border border-border text-zinc-300'
              }`}>
                <p className="text-sm">{status}</p>
              </div>
            )}

            {/* How It Works */}
            <div className="mt-12 p-6 bg-surface rounded-lg border border-border">
              <h2 className="text-lg font-semibold mb-4">How It Works</h2>
              <div className="space-y-3 text-sm text-zinc-400">
                <div className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span><strong className="text-zinc-200">Shield</strong> - Deposit SOL into the privacy pool. You receive a secret note.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span><strong className="text-zinc-200">Wait</strong> - For better privacy, wait before withdrawing.</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span><strong className="text-zinc-200">Withdraw</strong> - Use your note to withdraw to any address. ZK proofs ensure unlinkability.</span>
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

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-zinc-600">
          <p>Built with PrivKit • Privacy Cash SDK • Solana</p>
        </footer>
      </div>
    </main>
  );
}
