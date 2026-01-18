'use client';

import { useState } from 'react';

type Step = 'start' | 'goal' | 'feature' | 'result';
type Goal = 'defi' | 'privacy' | 'learning' | 'all';
type Feature = 'transfers' | 'compression' | 'compute';

interface Answer {
  goal?: Goal;
  feature?: Feature;
}

const recommendations: Record<string, { template: string; reason: string }> = {
  'defi-transfers': {
    template: 'privacy-cash',
    reason: 'Privacy Cash is perfect for DeFi apps needing private transfers with zero-knowledge proofs.',
  },
  'defi-compression': {
    template: 'light-protocol',
    reason: 'Light Protocol offers 5000x cheaper transactions - ideal for high-volume DeFi operations.',
  },
  'defi-compute': {
    template: 'arcium',
    reason: 'Arcium enables private smart contract execution using MPC - great for private DeFi logic.',
  },
  'privacy-transfers': {
    template: 'privacy-cash',
    reason: 'Privacy Cash provides native ZK proof support for completely private token transfers.',
  },
  'privacy-compression': {
    template: 'light-protocol',
    reason: 'Light Protocol combines privacy with massive cost savings through ZK compression.',
  },
  'privacy-compute': {
    template: 'arcium',
    reason: 'Arcium is designed for privacy-first applications requiring secure multi-party computation.',
  },
  'learning-transfers': {
    template: 'privacy-cash',
    reason: 'Privacy Cash has the most beginner-friendly examples for learning ZK transfers.',
  },
  'learning-compression': {
    template: 'light-protocol',
    reason: 'Light Protocol is well-documented and great for learning about ZK compression.',
  },
  'learning-compute': {
    template: 'full-stack',
    reason: 'Full Stack template shows all three SDKs side-by-side - perfect for learning and comparing.',
  },
  'all-transfers': {
    template: 'full-stack',
    reason: 'Full Stack gives you all three privacy approaches to compare and choose from.',
  },
  'all-compression': {
    template: 'full-stack',
    reason: 'Full Stack includes all SDKs so you can explore compression alongside other features.',
  },
  'all-compute': {
    template: 'full-stack',
    reason: 'Full Stack is ideal when you want to explore all privacy computing options.',
  },
};

const templateCommands: Record<string, string> = {
  'privacy-cash': 'npx create-solana-privacy-app -t privacy-cash',
  'light-protocol': 'npx create-solana-privacy-app -t light-protocol',
  'arcium': 'npx create-solana-privacy-app -t arcium',
  'full-stack': 'npx create-solana-privacy-app -t full-stack',
};

export function TemplateWizard() {
  const [step, setStep] = useState<Step>('start');
  const [answers, setAnswers] = useState<Answer>({});

  const handleGoalSelect = (goal: Goal) => {
    setAnswers({ ...answers, goal });
    setStep('feature');
  };

  const handleFeatureSelect = (feature: Feature) => {
    setAnswers({ ...answers, feature });
    setStep('result');
  };

  const getRecommendation = () => {
    const key = `${answers.goal}-${answers.feature}`;
    return recommendations[key] || recommendations['all-transfers'];
  };

  const reset = () => {
    setStep('start');
    setAnswers({});
  };

  const skipToTemplates = () => {
    const templatesSection = document.getElementById('templates');
    if (templatesSection) {
      templatesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-2xl mx-auto text-center">
        {step === 'start' && (
          <>
            <h2 className="text-3xl font-bold mb-4">Not Sure Which Template?</h2>
            <p className="text-zinc-400 mb-8">
              Answer two quick questions and we&apos;ll recommend the best template for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setStep('goal')}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Help Me Choose
              </button>
              <button
                onClick={skipToTemplates}
                className="px-6 py-3 bg-surface border border-border text-zinc-300 rounded-lg font-medium hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                I Know What I Need
              </button>
            </div>
          </>
        )}

        {step === 'goal' && (
          <>
            <h2 className="text-2xl font-bold mb-2">What are you building?</h2>
            <p className="text-zinc-400 mb-8">Select the option that best describes your project.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <WizardOption
                title="DeFi Application"
                description="Swaps, lending, yield farming"
                onClick={() => handleGoalSelect('defi')}
              />
              <WizardOption
                title="Privacy App"
                description="Private transfers, anonymous payments"
                onClick={() => handleGoalSelect('privacy')}
              />
              <WizardOption
                title="Learning / Exploring"
                description="Understanding Solana privacy"
                onClick={() => handleGoalSelect('learning')}
              />
              <WizardOption
                title="Not Sure Yet"
                description="Want to see all options"
                onClick={() => handleGoalSelect('all')}
              />
            </div>
          </>
        )}

        {step === 'feature' && (
          <>
            <h2 className="text-2xl font-bold mb-2">What feature matters most?</h2>
            <p className="text-zinc-400 mb-8">Choose your primary focus area.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <WizardOption
                title="Private Transfers"
                description="ZK proofs for token privacy"
                onClick={() => handleFeatureSelect('transfers')}
              />
              <WizardOption
                title="Cost Savings"
                description="5000x cheaper with compression"
                onClick={() => handleFeatureSelect('compression')}
              />
              <WizardOption
                title="Private Compute"
                description="MPC for secret logic"
                onClick={() => handleFeatureSelect('compute')}
              />
            </div>
          </>
        )}

        {step === 'result' && (
          <>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Recommended
            </div>
            <h2 className="text-2xl font-bold mb-2">{getRecommendation().template}</h2>
            <p className="text-zinc-400 mb-6">{getRecommendation().reason}</p>
            <div className="bg-surface border border-border rounded-lg p-4 mb-6">
              <code className="font-mono text-terminal-green text-sm">
                {templateCommands[getRecommendation().template]}
              </code>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-6 py-3 bg-surface border border-border text-zinc-300 rounded-lg font-medium hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Start Over
              </button>
              <button
                onClick={skipToTemplates}
                className="px-6 py-3 bg-primary/10 border border-primary/20 text-primary rounded-lg font-medium hover:bg-primary/20 transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View All Templates
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function WizardOption({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-surface border border-border rounded-lg text-left hover:border-primary/50 transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background group"
    >
      <h3 className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </button>
  );
}
