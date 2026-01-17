import { describe, it, expect } from 'vitest';
import { PublicKey } from '@solana/web3.js';
import {
  initArciumClient,
  encryptData,
  decryptResult,
  generateNonce
} from '../lib/privacy/arcium';

describe('Arcium Integration', () => {
  const testProgramId = new PublicKey('11111111111111111111111111111111');

  describe('initArciumClient', () => {
    it('should initialize with program ID', () => {
      const config = initArciumClient({ programId: testProgramId });
      expect(config.programId).toEqual(testProgramId);
    });
  });

  describe('encryption', () => {
    it('should encrypt and decrypt data', () => {
      const data = new Uint8Array([1, 2, 3, 4, 5]);
      const nonce = generateNonce();

      const encrypted = encryptData(data, nonce);
      expect(encrypted.ciphertext).toBeDefined();
      expect(encrypted.nonce).toEqual(nonce);

      const decrypted = decryptResult(encrypted);
      expect(decrypted).toBeDefined();
    });
  });

  describe('generateNonce', () => {
    it('should generate 12-byte nonce', () => {
      const nonce = generateNonce();
      expect(nonce.length).toBe(12);
    });

    it('should generate unique nonces', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      expect(nonce1).not.toEqual(nonce2);
    });
  });
});
