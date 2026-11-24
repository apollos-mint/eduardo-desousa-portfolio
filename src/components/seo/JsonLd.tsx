import React from 'react';
import { Locale } from '@/types';

interface JsonLdProps {
  lang: Locale;
}

export default function JsonLd({ lang }: JsonLdProps) {
  const BASE_URL = 'https://desousaops.vercel.app';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. Principal Consultant / Person Entity
      {
        '@type': 'Person',
        '@id': `${BASE_URL}/#person`,
        name: 'Eduardo de Sousa',
        givenName: 'Eduardo',
        familyName: 'de Sousa',
        jobTitle: 'Staff Operations, Quality & High-Tech Process Leader',
        url: BASE_URL,
        image: `${BASE_URL}/images/eduardo-hero.jpg`,
        email: 'mailto:desousaej@gmail.com',
        telephone: '+34-661-440-045',
        nationality: ['Portuguese', 'Venezuelan'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Enguera',
          addressRegion: 'Valencian Community',
          addressCountry: 'ES',
        },
        sameAs: [
          'https://www.linkedin.com/in/eduardo-de-sousa/',
          'https://github.com/desousaejai',
        ],
        worksFor: {
          '@id': `${BASE_URL}/#organization`,
        },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Lean Six Sigma Black Belt (DMAIC)',
            credentialCategory: 'Professional Certification',
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Strategic Supply Chain Management',
            recognizedBy: {
              '@type': 'CollegeOrUniversity',
              name: 'Ludwig-Maximilians-Universität München (LMU Munich)',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Google Data Analytics Professional Certificate',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Google',
            },
          },
        ],
        knowsAbout: [
          'European Industrial Operations',
          'Direct Sourcing & Factory-Gate Procurement',
          'Supply Chain Disintermediation',
          'Modular Housing Manufacturing',
          'Almussafes Industrial Corridor Operations',
          'Lean Six Sigma Black Belt (DMAIC)',
          'High-Tech Semiconductor Packaging Preparation & Electromechanical Sub-Assembly',
          'Automotive OEM Moving Line Assembly (VDL Nedcar / BMW / MINI)',
          '8D Root Cause Problem Solving & Quality Systems',
          'ISAH ERP System Governance',
          'PostgreSQL and MSSQL CMMS Telemetry Architecture',
          'Pre-Shipment & Container Loading Inspections (PSI/CLI)',
        ],
        description:
          'European operations leader and direct sourcing advisor specializing in factory-gate procurement, modular housing manufacturing scale, shop-floor assembly discipline, and Lean Six Sigma Black Belt quality systems.',
      },

      // 2. Industrial Advisory Firm / ProfessionalService Entity
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${BASE_URL}/#organization`,
        name: 'De Sousa Industrial Operations Advisory',
        legalName: 'Eduardo de Sousa Industrial Advisory',
        url: BASE_URL,
        logo: `${BASE_URL}/icon-512.png`,
        image: `${BASE_URL}/og-image.png`,
        founder: {
          '@id': `${BASE_URL}/#person`,
        },
        telephone: '+34-661-440-045',
        email: 'mailto:desousaej@gmail.com',
        priceRange: '€5,400 - €8,500',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Enguera',
          addressRegion: 'Valencian Community',
          addressCountry: 'ES',
        },
        areaServed: [
          { '@type': 'Country', name: 'Spain' },
          { '@type': 'Country', name: 'Netherlands' },
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Belgium' },
          { '@type': 'Country', name: 'Switzerland' },
          { '@type': 'AdministrativeArea', name: 'Valencian Community / Almussafes' },
          { '@type': 'AdministrativeArea', name: 'Brainport Eindhoven' },
          { '@type': 'Continent', name: 'Europe' },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '18',
          bestRating: '5.0',
          worstRating: '1.0',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          '@id': `${BASE_URL}/#catalog`,
          name: 'Industrial Advisory Mandates & Sourcing Sprints',
          itemListElement: [
            {
              '@type': 'Offer',
              '@id': `${BASE_URL}/#offer-diagnostic`,
              name: '14-Day Remote Spend & Telemetry Diagnostic',
              description:
                'Intensive 100% remote diagnostic targeting procurement spend variance, contract redundancies, and CMMS maintenance downtime logs. Backed by 100% fee credit guarantee.',
              price: '5500.00',
              priceCurrency: 'EUR',
              validFrom: '2026-01-01',
              itemOffered: {
                '@type': 'Service',
                name: '14-Day Remote Procurement & Maintenance Diagnostic',
                serviceType: 'Industrial Operations Diagnostic',
              },
            },
            {
              '@type': 'Offer',
              '@id': `${BASE_URL}/#offer-plant-audit`,
              name: '5-Day Physical Plant Gemba & Quality Audit',
              description:
                'On-site gemba walk, moving-line bottleneck analysis, torque calibration / gage R&R checks, scrap reduction, and empirical 8D containment roadmap for manufacturing plants and modular assembly facilities.',
              price: '5400.00',
              priceCurrency: 'EUR',
              validFrom: '2026-01-01',
              itemOffered: {
                '@type': 'Service',
                name: '5-Day On-Site Gemba & Quality Audit',
                serviceType: 'Factory Physical Plant Audit',
              },
            },
            {
              '@type': 'Offer',
              '@id': `${BASE_URL}/#offer-fractional`,
              name: 'Fractional Direct Sourcing & Systems Director',
              description:
                'Ongoing executive steering (2 days/week equivalent, async-first). Transcontinental factory-gate negotiations in Asia/LatAm (-40% to -75% BOM cost reduction), FCL logistics governance, CMMS architecture, and ERP integration.',
              price: '8500.00',
              priceCurrency: 'EUR',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: '8500.00',
                priceCurrency: 'EUR',
                unitCode: 'MON',
              },
              validFrom: '2026-01-01',
              itemOffered: {
                '@type': 'Service',
                name: 'Fractional Direct Sourcing & Operational Director',
                serviceType: 'Executive Advisory Retainer',
              },
            },
          ],
        },
      },

      // 3. Structured FAQPage Entity
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/${lang}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What services does Eduardo de Sousa provide for European manufacturing and modular housing companies?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Eduardo de Sousa provides productized advisory in factory-gate procurement, direct sourcing disintermediation (reducing supply chain costs by up to 75% across Asia and Latin America), modular housing BOM optimization (at inHAUS, Cecotec, and Almussafes industrial scale), and Lean Six Sigma Black Belt shop-floor quality execution.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the 14-Day Remote Diagnostic (€5,500) guarantee work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If the 14-day spend and telemetry diagnostic fails to document at least €16,500 in annual procurement unit-price deltas, contract redundancies, or logged maintenance labor inefficiencies, 100% of the €5,500 fee is credited toward an On-Site Audit or Fractional Executive Retainer.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the commercial pricing tiers for De Sousa Industrial Advisory?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Mandates are offered under three transparent fixed structures: 1) 14-Day Remote Spend & Telemetry Diagnostic at €5,500 fixed sprint; 2) 5-Day Physical Plant Gemba & Quality Audit at €5,400 sprint plus corporate travel expenses; and 3) Fractional Direct Sourcing & Systems Director at €8,500/month (2 days/week equivalent, async-first).',
            },
          },
          {
            '@type': 'Question',
            name: 'What is Eduardo de Sousa’s track record in automotive assembly and high-tech cleanrooms?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Eduardo inspected moving-line assembly at VDL Nedcar (110–120 BMW and MINI Cooper vehicles/shift), resolving torque calibration and electrical defects (-15% defect reduction). In the Brainport Eindhoven semiconductor ecosystem (HQ Pack Tier 2/3 supplier in the ASML semiconductor lithography ecosystem), he performed pre-cleanroom packaging preparation, electromechanical sub-assembly, TÜV hoisting winch recertification, and ISAH ERP lot tracking prior to cleanroom entry.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does factory-gate procurement disintermediate conventional supply chains?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'By bypassing domestic trading intermediaries and sourcing directly from ISO-certified manufacturers in China and India, deploying bilingual on-site engineering inspection teams (PSI/CLI), and securing factory-gate container pricing with full-container-load (FCL) maritime freight governance, clients eliminate 30% to 75% in middleman markup.',
            },
          },
        ],
      },

      // 4. WebSite & ProfilePage Linking
      {
        '@type': 'ProfilePage',
        '@id': `${BASE_URL}/${lang}/#webpage`,
        url: `${BASE_URL}/${lang}`,
        name: 'Eduardo de Sousa | European Industrial Operations & Sourcing Advisory',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${BASE_URL}/#website`,
          url: BASE_URL,
          name: 'De Sousa Industrial Operations Advisory',
          publisher: {
            '@id': `${BASE_URL}/#organization`,
          },
          inLanguage: ['en', 'es', 'pt', 'de', 'fr', 'nl'],
        },
        mainEntity: {
          '@id': `${BASE_URL}/#person`,
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
