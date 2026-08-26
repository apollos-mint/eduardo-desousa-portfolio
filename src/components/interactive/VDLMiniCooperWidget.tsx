'use client';

import React, { useState } from 'react';
import { Locale } from '@/types';
import BrandLogo from '@/components/ui/BrandLogos';
import {
  Car,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
  Gauge,
  Sliders,
  Sparkles,
  Layers,
  Wrench,
} from 'lucide-react';

interface VDLMiniCooperWidgetProps {
  currentLocale: Locale;
}

export default function VDLMiniCooperWidget({ currentLocale }: VDLMiniCooperWidgetProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('chassis');
  const [vehicleModel, setVehicleModel] = useState<'mini-cooper' | 'bmw-x1' | 'mini-countryman'>('mini-cooper');

  const models = [
    { id: 'mini-cooper', name: 'MINI Cooper / Cabrio (F56/F57)', throughput: '110-120 cars/shift', platform: 'UKL1 Multi-Platform' },
    { id: 'bmw-x1', name: 'BMW X1 (F48 OEM)', throughput: 'Full OEM Spec', platform: 'UKL2 High-Volume' },
    { id: 'mini-countryman', name: 'MINI Countryman Plug-in Hybrid', throughput: 'HV EV Battery Interlock', platform: 'High-Voltage Hybrid' },
  ];

  const hotspots = [
    {
      id: 'chassis',
      name: 'Chassis & Subframe Geometry',
      partner: 'BMW Group',
      spec: '±0.05 mm Laser Gap & Flush',
      telemetry: 'Automated optical 3D scanner pass & laser weld inspection.',
    },
    {
      id: 'battery',
      name: 'High-Voltage EV Battery & Inverter',
      partner: 'BMW / Samsung SDI',
      spec: '100% High-Voltage Interlock ISO 6469',
      telemetry: 'Dielectric isolation test pass, safety breaker lock checked.',
    },
    {
      id: 'sensors',
      name: 'Electronic Braking & Dynamic Sensors',
      partner: 'Bosch Automotive',
      spec: 'CAN-bus ECU Communication 0-fault',
      telemetry: 'Bosch ESP/ABS calibration and live telemetry verification.',
    },
    {
      id: 'torque',
      name: 'Dynamic Critical Torque Stations',
      partner: 'ZF / Brose',
      spec: '120 Nm ±1.5% Angle-Controlled',
      telemetry: 'Angle & torque curves logged with 100% serial traceability.',
    },
  ];

  const active = hotspots.find((h) => h.id === selectedHotspot) || hotspots[0];

  return (
    <div className="p-5 sm:p-7 rounded-3xl bg-slate-950/95 dark:bg-slate-950/95 light:bg-white border-2 border-emerald-500/40 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-subtle-grid-bg opacity-15 pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 dark:border-slate-800 light:border-slate-200 pb-4 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-950 dark:bg-emerald-950 light:bg-emerald-100 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Car className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-emerald-400 dark:text-emerald-400 light:text-emerald-700 tracking-wider">
              DIGITIZED VEHICLE QUALITY TELEMETRY // OEM ASSEMBLY LINE
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 light:text-slate-600">
              VDL Nedcar (Born, Netherlands) &bull; BMW Group & MINI Cooper Multi-Platform
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 dark:bg-emerald-950/80 light:bg-emerald-100 border border-emerald-500/40 text-emerald-400 font-bold">
            Cadence: 110-120/shift
          </span>
          <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/40 text-cyan-300 font-bold">
            8D / RCA: -15% Defect Rate
          </span>
        </div>
      </div>

      {/* Model Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 relative z-10">
        <span className="text-xs font-mono text-slate-400 mr-2">Target Vehicle:</span>
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => setVehicleModel(m.id as any)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
              vehicleModel === m.id
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                : 'bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-800 hover:border-emerald-500/40'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      {/* Digitized MINI Cooper Chassis Blueprint Interactive SVG (Clean, flicker-free) */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 relative overflow-hidden z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Stylized Digitized Mini Car Wireframe */}
          <div className="w-full lg:w-3/5 relative flex items-center justify-center py-2">
            <svg viewBox="0 0 500 200" className="w-full max-w-[460px] h-auto drop-shadow-xl">
              {/* Car Body Contour */}
              <path
                d="M50,140 L70,80 L160,50 L340,50 L420,95 L460,115 L460,145 L420,150 L380,150 A40,40 0 0,0 300,150 L200,150 A40,40 0 0,0 120,150 L70,150 Z"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeDasharray="6 3"
              />
              {/* Roof & Windows */}
              <path d="M170,55 L330,55 L390,95 L150,95 Z" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2" />
              <line x1="250" y1="55" x2="250" y2="95" stroke="#38bdf8" strokeWidth="2" />

              {/* Front Wheel */}
              <circle cx="340" cy="150" r="32" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
              <circle cx="340" cy="150" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

              {/* Rear Wheel */}
              <circle cx="160" cy="150" r="32" fill="#0f172a" stroke="#10b981" strokeWidth="3" />
              <circle cx="160" cy="150" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

              {/* Headlights & Tail Lights (Clean static glowing indicators) */}
              <circle cx="445" cy="115" r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="58" cy="115" r="5" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />

              {/* Hotspot 1: Chassis Laser Alignment */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedHotspot('chassis')}
              >
                <circle cx="250" cy="120" r="16" fill={selectedHotspot === 'chassis' ? '#38bdf8' : '#0284c7'} fillOpacity={selectedHotspot === 'chassis' ? '0.6' : '0.2'} stroke="#38bdf8" strokeWidth="2" />
                <circle cx="250" cy="120" r="6" fill="#38bdf8" />
                <text x="250" y="112" fontSize="10" fill="#ffffff" fontWeight="bold" textAnchor="middle">01</text>
              </g>

              {/* Hotspot 2: EV Battery Pack */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedHotspot('battery')}
              >
                <rect x="210" y="140" width="80" height="15" rx="4" fill={selectedHotspot === 'battery' ? '#10b981' : '#047857'} fillOpacity={selectedHotspot === 'battery' ? '0.9' : '0.5'} stroke="#10b981" strokeWidth="2" />
                <text x="250" y="151" fontSize="9" fill="#ffffff" fontWeight="bold" textAnchor="middle">BATTERY</text>
              </g>

              {/* Hotspot 3: Bosch Sensors & ECU */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedHotspot('sensors')}
              >
                <circle cx="390" cy="100" r="14" fill={selectedHotspot === 'sensors' ? '#e11d48' : '#991b1b'} fillOpacity={selectedHotspot === 'sensors' ? '0.6' : '0.2'} stroke="#e11d48" strokeWidth="2" />
                <circle cx="390" cy="100" r="5" fill="#f43f5e" />
                <text x="390" y="93" fontSize="9" fill="#ffffff" fontWeight="bold" textAnchor="middle">BOSCH</text>
              </g>

              {/* Hotspot 4: Dynamic Torque / Transmissions */}
              <g
                className="cursor-pointer group"
                onClick={() => setSelectedHotspot('torque')}
              >
                <circle cx="340" cy="150" r="18" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />
                <text x="340" y="195" fontSize="10" fill="#fbbf24" fontWeight="bold" textAnchor="middle">TORQUE</text>
              </g>
            </svg>
          </div>

          {/* Hotspot Detail Telemetry Card */}
          <div className="w-full lg:w-2/5 p-4 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-white border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
                Quality Gate Inspection
              </span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">{active.partner}</span>
            </div>

            <div className="text-sm font-bold text-white">
              {active.name}
            </div>

            <div className="p-2 rounded-lg bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border border-slate-800 text-[11px] font-mono text-emerald-400">
              Spec: {active.spec}
            </div>

            <div className="text-xs text-slate-200 leading-relaxed">
              {active.telemetry}
            </div>
          </div>
        </div>
      </div>

      {/* Tier-1 Automotive Ecosystem Logos */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono text-slate-400 relative z-10">
        <span className="text-slate-400">Automotive Tier-1 Ecosystem:</span>
        <div className="flex flex-wrap items-center gap-2">
          {['BMW', 'MINI', 'BOSCH', 'ZF', 'BROSE', 'VDL'].map((brand) => (
            <div key={brand} className="p-1.5 rounded-lg bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800">
              <BrandLogo name={brand} className="h-5 w-auto max-w-[70px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
