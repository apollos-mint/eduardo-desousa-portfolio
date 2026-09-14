'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Locale } from '@/types';

const ExperienceInteractiveWidget = dynamic(
  () => import('@/components/interactive/ExperienceInteractiveWidget'),
  { ssr: false }
);

interface ExperienceInteractiveHostProps {
  experienceId: string;
  company: string;
  currentLocale: Locale;
}

export default function ExperienceInteractiveHost(props: ExperienceInteractiveHostProps) {
  return <ExperienceInteractiveWidget {...props} />;
}
