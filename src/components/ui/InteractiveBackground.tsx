'use client';

import React from 'react';

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Subtle Dark Luxury Gradients */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-cyan-600/5 blur-[140px] animate-pulse-subtle" />
      <div className="absolute top-[40%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/5 blur-[160px] animate-pulse-subtle" />
      <div className="absolute -bottom-[20%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-indigo-600/5 blur-[150px] animate-pulse-subtle" />

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 subtle-grid-bg opacity-40" />

      {/* Top Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/95" />
    </div>
  );
}
