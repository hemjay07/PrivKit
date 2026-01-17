/**
 * Full-Stack Privacy Deployment Helper
 *
 * This script helps verify your development environment and provides
 * guidance for deploying all three privacy SDKs.
 */

import { Connection, clusterApiUrl } from '@solana/web3.js';

async function main() {
  console.log('Full-Stack Privacy Deployment Helper');
  console.log('====================================\n');

  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;

  console.log(`Network: ${network}`);
  console.log(`RPC URL: ${rpcUrl || 'NOT SET'}\n`);

  const connection = new Connection(rpcUrl || clusterApiUrl('devnet'), 'confirmed');

  try {
    const version = await connection.getVersion();
    console.log(`Connected to Solana ${version['solana-core']}`);
  } catch (error) {
    console.error('Failed to connect to Solana');
    process.exit(1);
  }

  console.log('\n=== Privacy Cash Setup ===');
  console.log('1. Ensure Node.js 24+ is installed');
  console.log('2. The SDK uses Groth16 ZK proofs');
  console.log('3. No additional deployment needed');

  console.log('\n=== Light Protocol Setup ===');
  console.log('1. Helius RPC is required (check .env.local)');
  console.log('2. Compressed token mints are created on-demand');
  console.log('3. See: https://docs.lightprotocol.com');

  console.log('\n=== Arcium Setup ===');
  console.log('1. Deploy Anchor program with #[arcium] macros');
  console.log('2. Configure MPC cluster ID in .env.local');
  console.log('3. See: https://docs.arcium.com');

  console.log('\n=== Verification Checklist ===');
  console.log('[x] Solana connection verified');
  console.log('[ ] Helius API key configured');
  console.log('[ ] Wallet has devnet SOL');
  console.log('[ ] Test each SDK individually');

  console.log('\nDone!');
}

main().catch(console.error);
