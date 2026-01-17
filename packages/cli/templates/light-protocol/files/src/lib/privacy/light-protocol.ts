/**
 * Light Protocol SDK Integration
 *
 * ZK Compression for Solana - up to 5000x cheaper than regular accounts
 *
 * IMPORTANT: Requires Helius RPC (standard Solana RPC won't work)
 */

import { Rpc, createRpc, confirmTx } from '@lightprotocol/stateless.js';
import {
  createMint,
  mintTo,
  transfer,
  CompressedTokenProgram
} from '@lightprotocol/compressed-token';
import { Keypair, PublicKey } from '@solana/web3.js';

export type LightRpc = Rpc;

/**
 * Create a Light Protocol RPC connection
 * MUST use Helius RPC endpoint
 */
export function createLightConnection(heliusRpcUrl: string): Rpc {
  return createRpc(heliusRpcUrl);
}

/**
 * Create a new compressed token mint
 */
export async function createCompressedMint(
  rpc: Rpc,
  payer: Keypair,
  decimals: number = 9
): Promise<{ mint: PublicKey; signature: string }> {
  const { mint, transactionSignature } = await createMint(
    rpc,
    payer,
    payer.publicKey,
    decimals,
    payer
  );

  return { mint, signature: transactionSignature };
}

/**
 * Mint compressed tokens to an address
 */
export async function mintCompressedTokens(
  rpc: Rpc,
  payer: Keypair,
  mint: PublicKey,
  destination: PublicKey,
  amount: number
): Promise<string> {
  const signature = await mintTo(
    rpc,
    payer,
    mint,
    destination,
    payer,
    amount
  );

  return signature;
}

/**
 * Transfer compressed tokens
 */
export async function transferCompressed(
  rpc: Rpc,
  payer: Keypair,
  mint: PublicKey,
  amount: number,
  recipient: PublicKey
): Promise<string> {
  const signature = await transfer(
    rpc,
    payer,
    mint,
    amount,
    payer,
    recipient
  );

  return signature;
}

/**
 * Get compressed token balances for an owner
 */
export async function getCompressedBalances(
  rpc: Rpc,
  owner: PublicKey
): Promise<Array<{ mint: string; balance: number }>> {
  const result = await rpc.getCompressedTokenBalancesByOwnerV2(owner);

  // Result is WithContext<WithCursor<TokenBalance[]>>
  // Access via result.value.items
  return result.value.items.map((item: { mint: PublicKey; balance: { toString: () => string } }) => ({
    mint: item.mint.toBase58(),
    balance: Number(item.balance.toString())
  }));
}
