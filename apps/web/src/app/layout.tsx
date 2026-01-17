import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'PrivKit - Zero to private in one command',
  description: 'The create-react-app for Solana privacy development. Scaffold complete privacy-focused projects with Privacy Cash, Light Protocol, or Arcium in seconds.',
  keywords: ['solana', 'privacy', 'zk', 'zero-knowledge', 'cli', 'scaffold', 'privacy-cash', 'light-protocol', 'arcium'],
  openGraph: {
    title: 'PrivKit - Zero to private in one command',
    description: 'The create-react-app for Solana privacy development.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
