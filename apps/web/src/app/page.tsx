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
import { SDKComparisonMatrix } from '@/components/SDKComparisonMatrix';
import { FAQ } from '@/components/FAQ';
import { Ecosystem } from '@/components/Ecosystem';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StickyNav />
      <Hero />
      <QuickStart />
      <BuiltWith />
      <TerminalDemo />
      <TemplateWizard />
      <TemplateShowcase />
      <TemplatePreview />
      <SDKComparisonMatrix />
      <Features />
      <Ecosystem />
      <ComparisonTable />
      <FAQ />
      <Footer />
    </main>
  );
}
