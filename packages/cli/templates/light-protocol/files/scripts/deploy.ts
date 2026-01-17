/**
 * Deployment script for Light Protocol devnet
 */

import { Connection, clusterApiUrl } from '@solana/web3.js';

async function main() {
  console.log('Light Protocol Deployment Helper\n');

  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;

  if (!rpcUrl || !rpcUrl.includes('helius')) {
    console.warn('WARNING: Light Protocol requires Helius RPC');
    console.warn('   Standard Solana RPC will NOT support ZK Compression');
    console.warn('   Get a free Helius API key at https://helius.dev\n');
  }

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

  const slot = await connection.getSlot();
  console.log(`Current slot: ${slot}`);

  console.log('\nNext Steps:');
  console.log('1. Ensure Helius RPC is configured in .env.local');
  console.log('2. Get devnet SOL from https://faucet.solana.com');
  console.log('3. Run "npm run dev" to start the app');
  console.log('4. Create and transfer compressed tokens');

  console.log('\nEnvironment is ready!');
}

main().catch(console.error);
