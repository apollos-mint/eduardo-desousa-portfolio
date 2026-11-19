import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import CookieConsentBanner from '@/components/ui/CookieConsentBanner';

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
  metadataBase: new URL('https://desousaops.vercel.app'),
  title: {
    default: 'Eduardo de Sousa | European Industrial Operations & Direct Sourcing Advisory',
    template: '%s | Eduardo de Sousa | Industrial Advisory',
  },
  description:
    'Industrial Operations & Direct Sourcing Leader. Lean Six Sigma Black Belt. Factory-gate procurement, modular housing manufacturing, shop-floor assembly discipline & automotive OEM quality.',
  keywords: [
    'Eduardo de Sousa',
    'European Industrial Operations',
    'Direct Sourcing',
    'Factory-Gate Procurement',
    'Supply Chain Disintermediation',
    'Modular Housing Manufacturing',
    'Almussafes Industrial Corridor',
    'Lean Six Sigma Black Belt',
    'DMAIC Process Optimization',
    'Shop-Floor Assembly Discipline',
    '8D Problem Solving',
    'Automotive OEM Quality Control',
    'VDL Nedcar Assembly Line',
    'ISAH ERP Systems',
    'Brainport Eindhoven',
    'DACH Manufacturing Advisory',
    'Valencia Industrial Operations',
  ],
  authors: [{ name: 'Eduardo de Sousa', url: 'mailto:desousaej@gmail.com' }],
  creator: 'Eduardo de Sousa',
  publisher: 'De Sousa Ops | Industrial Operations Advisory',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      es: '/es',
      pt: '/pt',
      de: '/de',
      fr: '/fr',
      nl: '/nl',
      'x-default': '/en',
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Eduardo de Sousa | European Industrial Operations & Direct Sourcing Advisory',
    description:
      'Productized advisory mandates for European manufacturing plants: 14-day diagnostic sprints, direct sourcing disintermediation (-75% cost), modular housing scaling, and ASML-grade quality systems.',
    url: 'https://desousaops.vercel.app',
    siteName: 'De Sousa Ops | Industrial Operations Advisory',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'pt_PT', 'nl_NL', 'de_DE', 'fr_FR'],
    images: [
      {
        url: 'https://desousaops.vercel.app/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Eduardo de Sousa | European Industrial Operations Advisory',
      },
      {
        url: 'https://desousaops.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eduardo de Sousa | European Industrial Operations Advisory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eduardo de Sousa | European Industrial Operations & Direct Sourcing Advisory',
    description:
      'Direct sourcing disintermediation, factory-gate procurement, modular housing manufacturing scale, and ASML cleanroom quality leadership.',
    images: [
      'https://desousaops.vercel.app/opengraph-image',
      'https://desousaops.vercel.app/og-image.png',
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const viewport: Viewport = {
  themeColor: '#051C2C',
  colorScheme: 'light',
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
      className={`scroll-smooth ${plusJakartaSans.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
      style={{ backgroundColor: '#ffffff', colorScheme: 'light' }}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.style.backgroundColor = '#ffffff';
                  document.documentElement.style.colorScheme = 'light';
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (!sessionStorage.getItem('initial_referrer')) {
                    if (document.referrer && !document.referrer.includes(window.location.hostname)) {
                      sessionStorage.setItem('initial_referrer', document.referrer);
                    }
                  }
                  var params = new URLSearchParams(window.location.search);
                  var utmSource = params.get('utm_source');
                  if (utmSource && !sessionStorage.getItem('initial_utm_source')) {
                    sessionStorage.setItem('initial_utm_source', utmSource);
                  }
                } catch (e) {}
              })();
              window.initClarity = function() {
                if (window._clarity_initialized) return;
                window._clarity_initialized = true;
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "yi78te801j");
                try {
                  var ref = sessionStorage.getItem('initial_referrer') || document.referrer;
                  var utm = sessionStorage.getItem('initial_utm_source') || new URLSearchParams(window.location.search).get('utm_source');
                  if (ref && !ref.includes(window.location.hostname)) {
                    window.clarity("set", "original_referrer", ref);
                  }
                  if (utm) {
                    window.clarity("set", "utm_source", utm);
                  }
                } catch (e) {}
              };
              try {
                if (localStorage.getItem('cookie-consent') === 'accepted') {
                  window.initClarity();
                }
                window.addEventListener('cookie-consent-updated', function(e) {
                  try {
                    if (localStorage.getItem('cookie-consent') === 'accepted') {
                      window.initClarity();
                    }
                  } catch (err) {}
                });
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className="text-slate-900 bg-white antialiased min-h-screen selection:bg-[#0066CC] selection:text-white font-sans"
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
