'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const TopicVisualizer = dynamic(() => import('@/components/3d/TopicVisualizer'), {
  ssr: false,
});

interface TopicVisualizerHostProps {
  type: 'cleanroom' | 'automotive' | 'logistics' | 'commercial' | 'consulting';
  title?: string;
}

export default function TopicVisualizerHost(props: TopicVisualizerHostProps) {
  return <TopicVisualizer {...props} />;
}
