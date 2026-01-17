import { describe, it, expect } from 'vitest';
import { UnifiedPrivacy, PrivacyProvider } from '../lib/privacy/unified';
import { Connection } from '@solana/web3.js';

describe('Full-Stack Privacy Tests', () => {
  describe('UnifiedPrivacy', () => {
    it('should get feature comparison for all providers', () => {
      const comparison = UnifiedPrivacy.getFeatureComparison();

      expect(comparison['privacy-cash']).toBeDefined();
      expect(comparison['light-protocol']).toBeDefined();
      expect(comparison['arcium']).toBeDefined();

      expect(comparison['privacy-cash'].length).toBeGreaterThan(0);
      expect(comparison['light-protocol'].length).toBeGreaterThan(0);
      expect(comparison['arcium'].length).toBeGreaterThan(0);
    });

    it('should recommend correct providers for use cases', () => {
      expect(UnifiedPrivacy.getRecommendation('payments')).toBe('privacy-cash');
      expect(UnifiedPrivacy.getRecommendation('tokens')).toBe('light-protocol');
      expect(UnifiedPrivacy.getRecommendation('gaming')).toBe('arcium');
    });

    it('should default to privacy-cash for unknown use cases', () => {
      expect(UnifiedPrivacy.getRecommendation('unknown')).toBe('privacy-cash');
    });

    it('should allow provider switching', () => {
      const connection = new Connection('https://api.devnet.solana.com');
      const client = new UnifiedPrivacy({
        provider: 'privacy-cash',
        connection
      });

      expect(client.getProvider()).toBe('privacy-cash');

      client.setProvider('light-protocol');
      expect(client.getProvider()).toBe('light-protocol');
    });
  });
});
