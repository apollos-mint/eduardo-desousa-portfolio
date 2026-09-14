'use client';

import React from 'react';

interface LightweightAnimatedBackgroundProps {
  variant?: 'subtle' | 'vibrant' | 'minimal';
  className?: string;
}

export default function LightweightAnimatedBackground({
  variant = 'subtle',
  className = '',
}: LightweightAnimatedBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 ${className}`}
    >
      {/* Animated Subtle Aurora Glow Orbs */}
      <div
        className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-3xl animate-pulse"
        style={{ animationDuration: '8s' }}
      />
      <div
        className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-emerald-500/8 dark:bg-emerald-500/12 blur-3xl animate-pulse"
        style={{ animationDuration: '11s', animationDelay: '2s' }}
      />
      <div
        className="absolute -bottom-28 left-1/4 w-[32rem] h-[32rem] rounded-full bg-indigo-500/6 dark:bg-indigo-500/10 blur-3xl animate-pulse"
        style={{ animationDuration: '14s', animationDelay: '4s' }}
      />

      {/* Cybernetic Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055] bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Subtle Horizontal Scanning Line */}
      <div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 dark:via-cyan-400/30 to-transparent animate-scan"
        style={{
          animation: 'scanline 12s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        }}
      />

      {/* Top & Bottom Soft Vignette to prevent harsh edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 dark:to-slate-950/70" />

      <style jsx>{`
        @keyframes scanline {
          0% {
            top: -5%;
            opacity: 0;
          }
          15% {
            opacity: 0.6;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            top: 105%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
