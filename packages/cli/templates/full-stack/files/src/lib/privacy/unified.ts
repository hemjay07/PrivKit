/**
 * Unified Privacy Abstraction Layer
 *
 * Provides a common interface across different privacy SDKs
 */

import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import type { Rpc } from '@lightprotocol/stateless.js';

export type PrivacyProvider = 'privacy-cash' | 'light-protocol' | 'arcium';

export interface PrivacyConfig {
  provider: PrivacyProvider;
  connection: Connection;
  lightRpc?: Rpc;
}

export interface TransferParams {
  amount: number;
  recipient: PublicKey;
  mint?: PublicKey;
}

export interface TransferResult {
  signature: string;
  provider: PrivacyProvider;
}

/**
 * Unified Privacy Client
 */
export class UnifiedPrivacy {
  private config: PrivacyConfig;

  constructor(config: PrivacyConfig) {
    this.config = config;
  }

  getProvider(): PrivacyProvider {
    return this.config.provider;
  }

  setProvider(provider: PrivacyProvider): void {
    this.config.provider = provider;
  }

  async privateTransfer(
    payer: Keypair,
    params: TransferParams
  ): Promise<TransferResult> {
    switch (this.config.provider) {
      case 'privacy-cash':
        return {
          signature: 'privacy-cash-transfer-' + Date.now(),
          provider: 'privacy-cash'
        };

      case 'light-protocol':
        return {
          signature: 'light-protocol-transfer-' + Date.now(),
          provider: 'light-protocol'
        };

      case 'arcium':
        return {
          signature: 'arcium-transfer-' + Date.now(),
          provider: 'arcium'
        };

      default:
        throw new Error(`Unknown provider: ${this.config.provider}`);
    }
  }

  static getFeatureComparison(): Record<PrivacyProvider, string[]> {
    return {
      'privacy-cash': [
        'Private SOL transfers',
        'SPL token support (USDC, USDT)',
        'Zero-knowledge proofs (Groth16)',
        'Lowest complexity',
        'Node.js 24+ required',
        'Standard RPC compatible'
      ],
      'light-protocol': [
        'Compressed tokens (5000x cheaper)',
        'ZK state compression',
        'Scalable for high volume',
        'Helius RPC required',
        'Node.js 18+ compatible',
        'Atomic decompress to SPL'
      ],
      'arcium': [
        'Multi-party computation',
        'Private computation on encrypted data',
        'Dark pools support',
        'Hidden game state',
        'Highest complexity',
        'Requires Anchor program'
      ]
    };
  }

  static getRecommendation(useCase: string): PrivacyProvider {
    const recommendations: Record<string, PrivacyProvider> = {
      'payments': 'privacy-cash',
      'transfers': 'privacy-cash',
      'tokens': 'light-protocol',
      'nft': 'light-protocol',
      'gaming': 'arcium',
      'voting': 'arcium',
      'defi': 'arcium',
      'auction': 'arcium'
    };

    return recommendations[useCase.toLowerCase()] || 'privacy-cash';
  }
}
