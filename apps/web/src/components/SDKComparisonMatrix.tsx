'use client';

import { useState } from 'react';

interface FeatureRow {
  feature: string;
  description: string;
  privacyCash: string | boolean;
  lightProtocol: string | boolean;
  arcium: string | boolean;
  fullStack: string | boolean;
}

const features: FeatureRow[] = [
  {
    feature: 'Primary Use Case',
    description: 'What the SDK excels at',
    privacyCash: 'Private Transfers',
    lightProtocol: 'Cost Reduction',
    arcium: 'Private Compute',
    fullStack: 'All-in-One',
  },
  {
    feature: 'ZK Proofs',
    description: 'Zero-knowledge proof support',
    privacyCash: true,
    lightProtocol: true,
    arcium: false,
    fullStack: true,
  },
  {
    feature: 'MPC Support',
    description: 'Multi-party computation',
    privacyCash: false,
    lightProtocol: false,
    arcium: true,
    fullStack: true,
  },
  {
    feature: 'Compressed Tokens',
    description: '5000x cheaper transactions',
    privacyCash: false,
    lightProtocol: true,
    arcium: false,
    fullStack: true,
  },
  {
    feature: 'Node Requirement',
    description: 'Minimum Node.js version',
    privacyCash: '24+',
    lightProtocol: '18+',
    arcium: '18+',
    fullStack: '24+',
  },
  {
    feature: 'Complexity',
    description: 'Learning curve difficulty',
    privacyCash: 'Medium',
    lightProtocol: 'Easy',
    arcium: 'Advanced',
    fullStack: 'Medium',
  },
  {
    feature: 'Helius RPC',
    description: 'Optimized RPC integration',
    privacyCash: true,
    lightProtocol: true,
    arcium: true,
    fullStack: true,
  },
  {
    feature: 'Wallet Integration',
    description: 'Pre-built wallet connect UI',
    privacyCash: true,
    lightProtocol: true,
    arcium: true,
    fullStack: true,
  },
  {
    feature: 'Anchor Support',
    description: 'Solana Anchor framework',
    privacyCash: false,
    lightProtocol: false,
    arcium: true,
    fullStack: true,
  },
  {
    feature: 'Test Suite',
    description: 'Vitest configured with examples',
    privacyCash: true,
    lightProtocol: true,
    arcium: true,
    fullStack: true,
  },
];

const templates = [
  { id: 'privacyCash', name: 'Privacy Cash', color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'lightProtocol', name: 'Light Protocol', color: 'text-secondary', bg: 'bg-secondary/10' },
  { id: 'arcium', name: 'Arcium', color: 'text-accent', bg: 'bg-accent/10' },
  { id: 'fullStack', name: 'Full Stack', color: 'text-success', bg: 'bg-success/10' },
];

type FilterType = 'all' | 'zkProofs' | 'costSaving' | 'mpc';

const filters: { id: FilterType; label: string }[] = [
  { id: 'all', label: 'All Features' },
  { id: 'zkProofs', label: 'ZK Proofs' },
  { id: 'costSaving', label: 'Cost Saving' },
  { id: 'mpc', label: 'MPC' },
];

function getFilteredFeatures(filter: FilterType): FeatureRow[] {
  if (filter === 'all') return features;
  if (filter === 'zkProofs') return features.filter(f => f.feature === 'ZK Proofs' || f.feature === 'Primary Use Case' || f.feature === 'Complexity');
  if (filter === 'costSaving') return features.filter(f => f.feature === 'Compressed Tokens' || f.feature === 'Primary Use Case' || f.feature === 'Helius RPC');
  if (filter === 'mpc') return features.filter(f => f.feature === 'MPC Support' || f.feature === 'Anchor Support' || f.feature === 'Primary Use Case' || f.feature === 'Complexity');
  return features;
}

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? (
      <svg className="w-5 h-5 text-success mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="w-5 h-5 text-zinc-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }
  return <span className="text-sm text-zinc-300">{value}</span>;
}

export function SDKComparisonMatrix() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const filteredFeatures = getFilteredFeatures(activeFilter);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">SDK Feature Comparison</h2>
        <p className="text-zinc-400 text-center mb-8">
          Compare capabilities across all privacy templates.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors duration-150 ${
                activeFilter === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-border text-zinc-400 hover:text-zinc-200 hover:border-zinc-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-left text-zinc-400 font-medium border-b border-border">Feature</th>
                {templates.map((template) => (
                  <th key={template.id} className={`p-3 text-center font-medium border-b border-border ${template.color}`}>
                    {template.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredFeatures.map((row, idx) => (
                <tr key={row.feature} className={idx % 2 === 0 ? 'bg-surface/50' : ''}>
                  <td className="p-3 border-b border-border">
                    <div className="font-medium text-zinc-200">{row.feature}</div>
                    <div className="text-xs text-zinc-500">{row.description}</div>
                  </td>
                  <td className="p-3 text-center border-b border-border">
                    <CellValue value={row.privacyCash} />
                  </td>
                  <td className="p-3 text-center border-b border-border">
                    <CellValue value={row.lightProtocol} />
                  </td>
                  <td className="p-3 text-center border-b border-border">
                    <CellValue value={row.arcium} />
                  </td>
                  <td className="p-3 text-center border-b border-border">
                    <CellValue value={row.fullStack} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {templates.map((template) => (
            <div key={template.id} className={`p-4 rounded-lg border border-border ${template.bg}`}>
              <h3 className={`font-semibold mb-3 ${template.color}`}>{template.name}</h3>
              <div className="space-y-2">
                {filteredFeatures.map((row) => (
                  <div key={row.feature} className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">{row.feature}</span>
                    <CellValue value={row[template.id as keyof FeatureRow] as string | boolean} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
