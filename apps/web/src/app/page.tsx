'use client';

import { Hero } from '@/components/Hero';
import { TerminalDemo } from '@/components/TerminalDemo';
import { TemplateShowcase } from '@/components/TemplateShowcase';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <TerminalDemo />
      <TemplateShowcase />
      <Features />
      <Footer />
    </main>
  );
}
