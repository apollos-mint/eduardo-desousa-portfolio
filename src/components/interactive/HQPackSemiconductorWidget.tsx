'use client';

import React, { useState, useEffect } from 'react';
import { Locale } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import {
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  Sparkles,
  Zap,
  Radio,
  Gauge,
  Box,
} from 'lucide-react';

interface HQPackSemiconductorWidgetProps {
  currentLocale: Locale;
}

export default function HQPackSemiconductorWidget({ currentLocale }: HQPackSemiconductorWidgetProps) {
  const [selectedPartner, setSelectedPartner] = useState<string>('ASML');
  const [selectedHotspot, setSelectedHotspot] = useState<string>('optics');
  const [particleCounter, setParticleCounter] = useState<number>(0);

  const partners = [
    { id: 'ASML', name: 'ASML', tag: 'EUV/DUV Lithography Systems', spec: 'ISO Class 5 Spec <0.1µm', status: 'Certified Tier-1' },
    { id: 'ZEISS', name: 'Zeiss', tag: 'High-NA Mirror Arrays', spec: 'Sub-nanometer Interferometry', status: 'Calibrated' },
    { id: 'TUV', name: 'TÜV Rheinland', tag: 'Audit & Compliance Certification', spec: '100% Traceability Verified', status: 'Audit Passed' },
    { id: 'ISO14644', name: 'ISO 14644', tag: 'Cleanroom Particulate Protocol', spec: 'Class 5 Particle Spec <0.1µm', status: 'Active Spec' },
    { id: 'ISAH', name: 'ERP ISAH', tag: 'Data Governance & Work Orders', spec: '150+ Monthly Logging', status: 'Traceable' },
    { id: 'NEWAYS', name: 'Neways', tag: 'Cleanroom PCBA Electronics', spec: 'ESD Grounding Shield', status: 'Active' },
    { id: 'FRENCKEN', name: 'Frencken', tag: 'High-Precision Mechatronics', spec: 'Sub-micron Tolerance', status: 'Validated' },
    { id: 'VDL', name: 'VDL', tag: 'Automated Carrier Frames', spec: 'Cleanroom Grade Aluminum', status: 'Active' },
  ];

  const hotspots = [
    {
      id: 'optics',
      name: '01. EUV / DUV Lithography Optics Seal',
      partner: 'ASML & Zeiss Optic Modules',
      spec: 'ISO Class 5 Cleanroom & Zero Outgassing',
      telemetry: 'Nitrogen purging chamber pass with laser particle counter inspection <0.1µm.',
    },
    {
      id: 'purge',
      name: '02. Hermetic Pressure & Nitrogen Chamber',
      partner: 'ISO 14644 & TÜV Rheinland Standards',
      spec: 'Leak Rate < 1x10^-9 mbar*l/s',
      telemetry: 'Hermetic barrier verification under vacuum and shock damping protocol.',
    },
    {
      id: 'pcba',
      name: '03. Cleanroom PCBA & Electrostatic Shield',
      partner: 'Neways PCBA & Cleanroom Electronics',
      spec: 'ESD Protection <10V & Conductive Ground',
      telemetry: 'Electrostatic dissipation test pass, surface resistivity certified.',
    },
    {
      id: 'frame',
      name: '04. Sub-Micron Precision Linear Guiding',
      partner: 'Frencken & VDL Mechatronics',
      spec: 'Positional Repeatability ±0.05 µm',
      telemetry: 'High-rigidity shock mounts logged into ISAH ERP work orders.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setParticleCounter((prev) => (prev >= 12 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activePartner = partners.find((p) => p.id === selectedPartner) || partners[0];
  const activeHotspot = hotspots.find((h) => h.id === selectedHotspot) || hotspots[0];

  return (
    <div className="p-4 sm:p-7 rounded-3xl bg-slate-950/95 dark:bg-slate-950/95 light:bg-white border-2 border-cyan-500/40 space-y-6 shadow-2xl relative overflow-hidden text-slate-900 dark:text-white">
      {/* Background Subtle Mesh Grid */}
      <div className="absolute inset-0 bg-subtle-grid-bg opacity-15 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-4 relative z-10">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-cyan-950 dark:bg-cyan-950 light:bg-cyan-100 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Box className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-mono font-bold text-cyan-400 dark:text-cyan-400 light:text-cyan-700 tracking-wider truncate">
              SEMICONDUCTOR CLEANROOM PACKAGING TELEMETRY // ASML ECOSYSTEM
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 light:text-slate-600 truncate">
              Brainport Eindhoven &bull; HQ Pack ISO Class 5 Specification
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 dark:bg-emerald-950/80 light:bg-emerald-100 border border-emerald-500/40 text-emerald-400 font-bold whitespace-nowrap">
            ERP ISAH: 150+ /mo
          </span>
          <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/40 text-cyan-300 font-bold whitespace-nowrap">
            Cycle: -30%
          </span>
        </div>
      </div>

      {/* Company Logo Matrix / Constellation */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Click any partner logo to inspect cleanroom interface:</span>
          <span className="text-cyan-400 font-bold whitespace-nowrap">{partners.length} Tier-1 Partners</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {partners.map((p) => {
            const isSelected = selectedPartner === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPartner(p.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between min-w-0 ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/90 to-slate-900/90 dark:from-cyan-950/90 dark:to-slate-900/90 light:bg-cyan-50 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-50 border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="h-6 flex items-center">
                    <BrandLogo name={p.name} className="h-5 w-auto max-w-[80px]" />
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      isSelected ? 'bg-cyan-400' : 'bg-slate-600'
                    }`}
                  />
                </div>
                <div className="mt-2.5 min-w-0">
                  <div className="text-[11px] font-bold text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-slate-300 truncate">
                    {p.tag}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Digitized Semiconductor Wafer Transport Container Blueprint SVG */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 relative overflow-hidden z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Blueprint SVG Diagram */}
          <div className="w-full lg:w-3/5 relative flex items-center justify-center py-2">
            <svg viewBox="0 0 460 200" className="w-full max-w-[420px] h-auto drop-shadow-xl">
              {/* Outer Hermetic Container Shell */}
              <rect x="40" y="30" width="380" height="140" rx="16" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 3" />
              <rect x="55" y="45" width="350" height="110" rx="10" fill="#0284c7" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1.5" />

              {/* Silicon Wafer Stack (Interior) */}
              <ellipse cx="230" cy="100" rx="90" ry="30" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              <ellipse cx="230" cy="95" rx="75" ry="25" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="230" cy="95" r="8" fill="#38bdf8" />

              {/* Hotspot 01: Lithography Optics Seal */}
              <g className="cursor-pointer" onClick={() => setSelectedHotspot('optics')}>
                <circle cx="100" cy="70" r="15" fill={selectedHotspot === 'optics' ? '#38bdf8' : '#0284c7'} fillOpacity={selectedHotspot === 'optics' ? '0.7' : '0.25'} stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="74" fontSize="10" fill="#ffffff" fontWeight="bold" textAnchor="middle">01</text>
              </g>

              {/* Hotspot 02: Nitrogen Chamber */}
              <g className="cursor-pointer" onClick={() => setSelectedHotspot('purge')}>
                <circle cx="360" cy="70" r="15" fill={selectedHotspot === 'purge' ? '#10b981' : '#047857'} fillOpacity={selectedHotspot === 'purge' ? '0.7' : '0.25'} stroke="#10b981" strokeWidth="2" />
                <text x="360" y="74" fontSize="10" fill="#ffffff" fontWeight="bold" textAnchor="middle">02</text>
              </g>

              {/* Hotspot 03: ESD Grounding */}
              <g className="cursor-pointer" onClick={() => setSelectedHotspot('pcba')}>
                <circle cx="100" cy="130" r="15" fill={selectedHotspot === 'pcba' ? '#e11d48' : '#991b1b'} fillOpacity={selectedHotspot === 'pcba' ? '0.7' : '0.25'} stroke="#e11d48" strokeWidth="2" />
                <text x="100" y="134" fontSize="10" fill="#ffffff" fontWeight="bold" textAnchor="middle">03</text>
              </g>

              {/* Hotspot 04: Linear Guiding */}
              <g className="cursor-pointer" onClick={() => setSelectedHotspot('frame')}>
                <circle cx="360" cy="130" r="15" fill={selectedHotspot === 'frame' ? '#fbbf24' : '#b45309'} fillOpacity={selectedHotspot === 'frame' ? '0.7' : '0.25'} stroke="#fbbf24" strokeWidth="2" />
                <text x="360" y="134" fontSize="10" fill="#ffffff" fontWeight="bold" textAnchor="middle">04</text>
              </g>
            </svg>
          </div>

          {/* Hotspot Telemetry Card */}
          <div className="w-full lg:w-2/5 p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-white border border-cyan-500/30 space-y-2.5 min-w-0">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="uppercase text-cyan-400 font-bold">Packaging Blueprint Node</span>
              <span className="text-emerald-400 font-bold truncate max-w-[120px]">{activePartner.name}</span>
            </div>

            <div className="text-xs sm:text-sm font-bold text-white leading-snug">
              {activeHotspot.name}
            </div>

            <div className="p-2 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border border-slate-800 text-[11px] font-mono text-cyan-300">
              Spec: {activeHotspot.spec}
            </div>

            <div className="text-xs text-slate-200 leading-relaxed">
              {activeHotspot.telemetry}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Partner Status Card */}
      <div className="p-4 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono relative z-10">
        <div>
          <div className="text-[10px] text-slate-300 uppercase">Selected Interface</div>
          <div className="font-bold text-sm text-cyan-400 truncate">{activePartner.name} Lithography Module</div>
          <div className="text-[11px] text-slate-200 truncate">{activePartner.tag}</div>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l border-slate-800 dark:border-slate-800 light:border-slate-300 pt-2 sm:pt-0 sm:pl-3">
          <div className="text-[10px] text-slate-300 uppercase">Cleanroom Protocol</div>
          <div className="font-bold text-white truncate">{activePartner.spec}</div>
          <div className="text-[11px] text-emerald-400 font-bold">✓ ASML Protocol Pass</div>
        </div>

        <div className="border-t sm:border-t-0 sm:border-l border-slate-800 dark:border-slate-800 light:border-slate-300 pt-2 sm:pt-0 sm:pl-3">
          <div className="text-[10px] text-slate-400 uppercase">ISAH ERP Live Stream</div>
          <div className="font-bold text-cyan-300">Work Order #{84200 + particleCounter}</div>
          <div className="text-[10px] text-slate-400">Zero Particulate Pass</div>
        </div>
      </div>
    </div>
  );
}
