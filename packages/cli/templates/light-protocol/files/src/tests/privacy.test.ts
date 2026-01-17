import { describe, it, expect, vi } from 'vitest';
import { PublicKey } from '@solana/web3.js';

vi.mock('@lightprotocol/stateless.js', () => ({
  createRpc: vi.fn(() => ({
    getCompressedTokenBalancesByOwnerV2: vi.fn(() => Promise.resolve({ items: [] }))
  })),
  confirmTx: vi.fn()
}));

vi.mock('@lightprotocol/compressed-token', () => ({
  createMint: vi.fn(() => Promise.resolve({
    mint: new PublicKey('11111111111111111111111111111111'),
    transactionSignature: 'mock_sig'
  })),
  mintTo: vi.fn(() => Promise.resolve('mock_mint_sig')),
  transfer: vi.fn(() => Promise.resolve('mock_transfer_sig'))
}));

import {
  createLightConnection,
  getCompressedBalances
} from '../lib/privacy/light-protocol';

describe('Light Protocol Integration', () => {
  const testWallet = new PublicKey('11111111111111111111111111111111');
  const mockRpcUrl = 'https://devnet.helius-rpc.com/?api-key=test';

  describe('createLightConnection', () => {
    it('should create an RPC connection', () => {
      const rpc = createLightConnection(mockRpcUrl);
      expect(rpc).toBeDefined();
    });
  });

  describe('getCompressedBalances', () => {
    it('should return an array of balances', async () => {
      const rpc = createLightConnection(mockRpcUrl);
      const balances = await getCompressedBalances(rpc, testWallet);

      expect(Array.isArray(balances)).toBe(true);
    });
  });
});
