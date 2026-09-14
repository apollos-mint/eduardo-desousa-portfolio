import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Self-hosted via next/font — eliminates external CDN dependency with optimal variable woff2
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: true,
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
});

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
    <html
      lang="en"
      className={`dark scroll-smooth ${plusJakartaSans.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
      style={{ backgroundColor: '#07090e', colorScheme: 'dark' }}
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                  document.documentElement.style.backgroundColor = '#07090e';
                  document.documentElement.style.colorScheme = 'dark';
                  localStorage.setItem('portfolio-theme', 'dark');
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "yi78te801j");
            `,
          }}
        />
      </head>
      <body
        className="bg-[#07090e] text-slate-100 antialiased min-h-screen selection:bg-cyan-500 selection:text-slate-950 font-sans"
        style={{ backgroundColor: '#07090e' }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
