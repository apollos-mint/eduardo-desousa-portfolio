import React from 'react';
import { Locale } from '@/types';

interface JsonLdProps {
  lang: Locale;
}

export default function JsonLd({ lang }: JsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://eduardodesousa.vercel.app/#person',
        name: 'Eduardo de Sousa',
        givenName: 'Eduardo',
        familyName: 'de Sousa',
        jobTitle: 'Staff Operations, Quality & High-Tech Process Leader',
        url: 'https://eduardodesousa.vercel.app',
        image: 'https://eduardodesousa.vercel.app/images/eduardo-hero.jpg',
        email: 'mailto:desousaej@gmail.com',
        telephone: '+31 6 12345678',
        sameAs: [
          'https://www.linkedin.com/in/eduardo-de-sousa/',
          'https://github.com/desousaejai',
        ],
        worksFor: [
          {
            '@type': 'Organization',
            name: 'KMWE Group',
            description: 'High-tech precision engineering supplier for ASML semiconductor systems',
          },
          {
            '@type': 'Organization',
            name: 'HQ Pack',
            description: 'Cleanroom high-tech packaging and clean manufacturing',
          },
          {
            '@type': 'Organization',
            name: 'VDL Nedcar',
            description: 'Automotive vehicle assembly and OEM manufacturing',
          },
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Lean Six Sigma Black Belt',
            credentialCategory: 'Professional Certification',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'ISO 9001:2015 Lead Auditor',
            recognizedBy: {
              '@type': 'Organization',
              name: 'TÜV Rheinland',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'VCA-VOL Safety for Operational Supervisors',
          },
        ],
        knowsAbout: [
          'Lean Six Sigma (DMAIC)',
          'ASML Semiconductor Supply Chain',
          'Cleanroom Manufacturing (ISO 14644)',
          'Automotive OEM Quality Standards (IATF 16949)',
          'ISAH ERP System',
          'Root Cause Analysis (RCA / 8D)',
          'Statistical Process Control (SPC)',
          'Supplier Quality Assurance (SQA)',
          'High-Precision Machining & Assembly',
          'Continuous Improvement & Kaizen',
        ],
        description:
          'Staff Operations & Quality Engineering Leader with proven executive experience in ASML semiconductor supply chain, cleanroom manufacturing, and automotive OEM quality inspections.',
      },
      {
        '@type': 'ProfilePage',
        '@id': `https://eduardodesousa.vercel.app/${lang}/#webpage`,
        url: `https://eduardodesousa.vercel.app/${lang}`,
        name: 'Eduardo de Sousa | Staff Operations, Quality & Process Leader',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://eduardodesousa.vercel.app/#website',
          url: 'https://eduardodesousa.vercel.app',
          name: 'Eduardo de Sousa Portfolio',
          publisher: {
            '@id': 'https://eduardodesousa.vercel.app/#person',
          },
          inLanguage: ['es', 'en', 'pt', 'de', 'fr', 'nl'],
        },
        mainEntity: {
          '@id': 'https://eduardodesousa.vercel.app/#person',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
