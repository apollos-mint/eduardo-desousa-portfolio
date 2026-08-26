import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eduardo de Sousa | Staff Operations, Quality & High-Tech Process Leader',
  description:
    'Executive portfolio of Eduardo de Sousa. Operations, Quality and Process Leader. Lean Six Sigma Black Belt, ASML semiconductor supply chain, automotive OEM quality inspections, and global factory auditing.',
  keywords: [
    'Eduardo de Sousa',
    'Operations Leader',
    'Quality Engineering',
    'Lean Six Sigma Black Belt',
    'ASML Supply Chain',
    'ISO 9001 Auditor',
    'TÜV Certification',
    'DMAIC',
    'Automotive OEM',
    'ISAH ERP',
    'Brainport Eindhoven',
  ],
  authors: [{ name: 'Eduardo de Sousa', url: 'mailto:desousaej@gmail.com' }],
  creator: 'Eduardo de Sousa',
  openGraph: {
    title: 'Eduardo de Sousa | Staff Operations & Quality Leader',
    description:
      'High-performance operations leader specializing in high-tech cleanrooms, automotive manufacturing, and global industrial auditing.',
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US', 'pt_PT', 'nl_NL', 'de_DE', 'fr_FR'],
  },
};

export const viewport: Viewport = {
  themeColor: '#07090e',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta name="color-scheme" content="dark light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090e] text-slate-100 antialiased min-h-screen selection:bg-cyan-500 selection:text-slate-950 font-sans">
        {children}
      </body>
    </html>
  );
}
