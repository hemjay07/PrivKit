/**
 * Deployment script for Arcium devnet
 */

import { Connection, clusterApiUrl } from '@solana/web3.js';

async function main() {
  console.log('Arcium MPC Deployment Helper\n');

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

  console.log('\nArcium Integration Steps:');
  console.log('1. Deploy Anchor program with #[arcium] macros');
  console.log('2. Configure MPC cluster ID in .env.local');
  console.log('3. Set ARCIUM_PROGRAM_ID to your deployed program');
  console.log('4. Update arcium.ts to use real SDK calls');

  console.log('\nResources:');
  console.log('   - Arcium Docs: https://docs.arcium.com');
  console.log('   - Example Programs: https://docs.arcium.com/developers/examples');

  console.log('\nClient environment ready!');
}

main().catch(console.error);
