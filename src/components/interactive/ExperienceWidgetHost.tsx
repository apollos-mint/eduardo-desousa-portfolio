'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TopicVisualizer = dynamic(() => import('@/components/3d/TopicVisualizer'), { ssr: false });
const HQPackWidget = dynamic(() => import('@/components/3d/HQPackWidget'), { ssr: false });
const VDLWidget = dynamic(() => import('@/components/3d/VDLWidget'), { ssr: false });
const ConsultantWidget = dynamic(() => import('@/components/3d/ConsultantWidget'), { ssr: false });
const WarehousePalletWidget = dynamic(() => import('@/components/interactive/WarehousePalletWidget'), { ssr: false });
const CommercialKitchenWidget = dynamic(() => import('@/components/interactive/CommercialKitchenWidget'), { ssr: false });
const SalesConsultationWidget = dynamic(() => import('@/components/interactive/SalesConsultationWidget'), { ssr: false });

interface ExperienceWidgetHostProps {
  experienceId: string;
  company: string;
  industry: string;
  visualType?: any;
  lang: string;
}

export default function ExperienceWidgetHost({
  experienceId,
  company,
  industry,
  visualType,
  lang,
}: ExperienceWidgetHostProps) {
  const title = `${company} // ${industry}`;

  if (experienceId === 'hq-pack') {
    return <HQPackWidget title={title} lang={lang} />;
  }
  if (experienceId === 'vdl-nedcar') {
    return <VDLWidget title={title} lang={lang} />;
  }
  if (experienceId === 'independent-consultant') {
    return <ConsultantWidget title={title} lang={lang} />;
  }
  if (experienceId === 'arkcohogar') {
    return <WarehousePalletWidget title={title} lang={lang} />;
  }
  if (experienceId === 'eds-paixao') {
    return <CommercialKitchenWidget title={title} lang={lang} />;
  }
  if (experienceId === 'e-ceramic') {
    return <SalesConsultationWidget title={title} lang={lang} />;
  }
  return <TopicVisualizer type={visualType} title={title} />;
}
