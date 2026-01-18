'use client';

import { Hero } from '@/components/Hero';
import { TerminalDemo } from '@/components/TerminalDemo';
import { TemplateShowcase } from '@/components/TemplateShowcase';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { StickyNav } from '@/components/StickyNav';
import { BuiltWith } from '@/components/BuiltWith';
import { ComparisonTable } from '@/components/ComparisonTable';
import { TemplateWizard } from '@/components/TemplateWizard';
import { TemplatePreview } from '@/components/TemplatePreview';
import { QuickStart } from '@/components/QuickStart';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <StickyNav />
      <Hero />
      <QuickStart />
      <BuiltWith />
      <TerminalDemo />
      <TemplateWizard />
      <TemplateShowcase />
      <TemplatePreview />
      <Features />
      <ComparisonTable />
      <Footer />
    </main>
  );
}
