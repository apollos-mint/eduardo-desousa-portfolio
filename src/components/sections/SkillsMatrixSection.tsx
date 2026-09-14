'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Locale, CVContent, SkillCategory, SkillItem } from '@/types';
import {
  Wrench,
  Layers,
  ShieldCheck,
  Cpu,
  Database,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface SkillsMatrixSectionProps {
  currentLocale: Locale;
  cvData: CVContent;
}

export default function SkillsMatrixSection({
  currentLocale,
  cvData,
}: SkillsMatrixSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: cvData.navigation.allSkills },
    ...cvData.skillCategories.map((c) => ({ id: c.id, name: c.name })),
  ];

  const filteredSkills =
    selectedCategory === 'all'
      ? cvData.skills
      : cvData.skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Sliders className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">
              {cvData.navigation.skills} // Competencies
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {cvData.common.coreCompetencies}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Quantitative frameworks, quality certifications, enterprise ERPs, and precision mechanical engineering.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 backdrop-blur-md ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 hover:bg-cyan-500/35 border-2 border-cyan-400/60 text-cyan-950 dark:text-cyan-200 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/35 hover:bg-slate-800/50 border border-slate-700/50 text-slate-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <Link
              key={skill.id}
              href={`/${currentLocale}/skills/${skill.id}`}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between group cursor-pointer transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                    {skill.category.replace('-', ' ')}
                  </span>
                  <div className="flex items-center space-x-1 text-emerald-400 font-mono text-xs font-bold">
                    <span>{skill.level}%</span>
                    <span className="text-[10px] text-slate-500">Mastery</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed text-justify">
                  {skill.description}
                </p>

                {/* Tools & Framework Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {skill.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 group-hover:text-cyan-300 font-medium">
                <span>{cvData.navigation.viewDeepDive}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
