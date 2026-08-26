'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale, CVContent, SkillCategory, SkillItem } from '@/types';
import {
  Sliders,
  Search,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Database,
  Wrench,
  Sparkles,
  Layers,
} from 'lucide-react';

interface DynamicSkillMatrixWidgetProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function DynamicSkillMatrixWidget({
  currentLocale,
  cvData,
}: DynamicSkillMatrixWidgetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', name: cvData.navigation.allSkills, icon: Layers, count: cvData.skills.length },
    { id: 'problem-solving', name: 'DMAIC & Problem Solving', icon: TrendingUp, count: cvData.skills.filter((s) => s.category === 'problem-solving').length },
    { id: 'quality-compliance', name: 'Quality & ISO Compliance', icon: ShieldCheck, count: cvData.skills.filter((s) => s.category === 'quality-compliance').length },
    { id: 'systems-data', name: 'ERP (ISAH) & Data Analytics', icon: Database, count: cvData.skills.filter((s) => s.category === 'systems-data').length },
    { id: 'technical-engineering', name: 'Cleanroom & Mechanics', icon: Wrench, count: cvData.skills.filter((s) => s.category === 'technical-engineering').length },
  ];

  const filteredSkills = cvData.skills.filter((s) => {
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Control Hub */}
      <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-cyan-500/30 space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, tools, or methodologies (e.g. DMAIC, ISAH, ISO 9001)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 dark:bg-slate-950/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-300 focus:border-cyan-500 focus:outline-none text-xs sm:text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>Showing:</span>
            <span className="font-bold text-cyan-400">{filteredSkills.length} competencies</span>
          </div>
        </div>

        {/* Category Pills Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-center space-x-2.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20 border-cyan-400'
                    : 'bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:border-cyan-500/40'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-slate-950' : 'text-cyan-400'}`} />
                <div className="truncate">
                  <div className="text-xs truncate">{cat.name}</div>
                  <div className={`text-[10px] font-mono ${isSelected ? 'text-slate-900' : 'text-slate-500'}`}>
                    {cat.count} verified
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <Link
            key={skill.id}
            href={`/${currentLocale}/skills/${skill.id}`}
            className="glass-panel glass-panel-hover p-6 rounded-3xl border border-slate-800 dark:border-slate-800 light:border-slate-200 flex flex-col justify-between group cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-cyan-950/80 dark:bg-cyan-950/80 light:bg-cyan-100 border border-cyan-500/30 text-cyan-300 dark:text-cyan-300 light:text-cyan-700 font-semibold">
                  {skill.category.replace('-', ' ')}
                </span>
                <div className="flex items-center space-x-1 text-emerald-400 font-mono text-xs font-bold">
                  <span>{skill.level}%</span>
                  <span className="text-[10px] text-slate-500">Mastery</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-1.5 bg-slate-900 dark:bg-slate-900 light:bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mt-1">
                  {skill.description}
                </p>
              </div>

              {/* Tools & Framework Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {skill.tools.map((tool, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-[10px] font-mono text-slate-400 dark:text-slate-300 light:text-slate-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between text-xs text-cyan-400 group-hover:text-cyan-300 font-medium">
              <span>{cvData.navigation.viewDeepDive}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
