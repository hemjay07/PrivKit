import { describe, it, expect } from 'vitest';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { deposit, withdraw, getPrivateBalance } from '../lib/privacy/privacy-cash';

describe('Privacy Cash Integration', () => {
  const connection = new Connection('https://api.devnet.solana.com');
  const testWallet = new PublicKey('11111111111111111111111111111111');

  describe('deposit', () => {
    it('should return a deposit result with note', async () => {
      const result = await deposit(connection, testWallet, 0.1 * LAMPORTS_PER_SOL);

      expect(result).toBeDefined();
      expect(result.signature).toBeDefined();
      expect(result.note).toBeDefined();
      expect(result.commitment).toBeDefined();
    });
  });

  describe('withdraw', () => {
    it('should return a withdraw result', async () => {
      const recipient = 'DemoRecipientAddress11111111111111111';
      const result = await withdraw(
        connection,
        testWallet,
        0.1 * LAMPORTS_PER_SOL,
        recipient
      );

      expect(result).toBeDefined();
      expect(result.signature).toBeDefined();
    });
  });

  describe('getPrivateBalance', () => {
    it('should return a balance', async () => {
      const balance = await getPrivateBalance(connection, testWallet.toBase58());

      expect(typeof balance).toBe('number');
      expect(balance).toBeGreaterThanOrEqual(0);
    });
  });
});
