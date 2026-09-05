'use client';

import React from 'react';

export default function CyberTechBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0" aria-hidden="true">
      {/* 1. Subtle SVG Technical Matrix Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-40 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* 40x40 Blueprint Technical Grid */}
          <pattern id="cyber-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              className="text-slate-300 dark:text-slate-800"
            />
            <circle cx="40" cy="40" r="1" className="fill-cyan-500/40 dark:fill-cyan-400/40" />
          </pattern>
          {/* 160x160 Major Sector Grid */}
          <pattern id="major-grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <rect width="160" height="160" fill="url(#cyber-grid)" />
            <path
              d="M 160 0 L 0 0 0 160"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              className="text-cyan-500/20 dark:text-cyan-400/20"
            />
            {/* Corner Crosshairs */}
            <path
              d="M 155 160 L 165 160 M 160 155 L 160 165"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-cyan-600/40 dark:text-cyan-400/40"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#major-grid)" />
      </svg>

      {/* 2. Soft High-Tech Ambient Radial Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-indigo-500/10 dark:from-cyan-500/15 dark:via-emerald-500/10 dark:to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* 3. Floating Engineering Telemetry Annotations (Micro-Labels) */}
      <div className="hidden lg:block absolute top-6 left-8 font-mono text-[9px] text-cyan-800/60 dark:text-cyan-400/40 tracking-wider space-y-1">
        <div>SYS.NODE // SOURCING LAT 22.3193° N · LON 114.1694° E</div>
        <div>METRICS: FCL 40&apos;HC · 20 CONT/QTR · -75% NET DISINTERMEDIATION</div>
      </div>

      <div className="hidden lg:block absolute top-6 right-8 font-mono text-[9px] text-emerald-800/60 dark:text-emerald-400/40 text-right tracking-wider space-y-1">
        <div>SPEC: ASML ISO 14644-1 CL.5 CLEANROOM &lt;0.1µm</div>
        <div>CADENCE: BMW/MINI OEM 110-120 VEH/SHIFT · 8D RCA ZERO DEFECTS</div>
      </div>

      {/* 4. Scanning Telemetry Pulse Lines */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-cyan-400/30 to-transparent" />
      <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 dark:via-emerald-400/30 to-transparent" />
    </div>
  );
}
