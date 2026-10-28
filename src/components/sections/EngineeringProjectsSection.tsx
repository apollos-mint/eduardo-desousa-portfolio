'use client';

import React from 'react';
import { Locale } from '@/types';
import { getProjectsData } from '@/data/projects-data';
import {
  ExternalLink,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Terminal,
  Activity,
  ArrowUpRight
} from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

interface EngineeringProjectsSectionProps {
  currentLocale: Locale;
}

export default function EngineeringProjectsSection({
  currentLocale
}: EngineeringProjectsSectionProps) {
  const content = getProjectsData(currentLocale);

  const getBadgeStyle = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
      case 'emerald':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'cyan':
        return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
      case 'amber':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'optiasset-cmms':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'kyrios-keys-marketplace':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'doxa-saas-studio':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'jobflow-automation-extension':
        return <Terminal className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="engineering-projects" className="relative py-16 sm:py-24 overflow-hidden border-t border-slate-800/60">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-cyan-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-4 shadow-sm">
            <Activity className="w-3.5 h-3.5" />
            <span>{content.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 font-heading">
            {content.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {content.projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1"
            >
              {/* Card Header & Badges */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 group-hover:scale-105 transition-transform">
                      {getProjectIcon(project.id)}
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                        {project.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle(
                      project.badgeVariant
                    )}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {project.badge}
                  </span>
                </div>

                {/* Subtitle & Value Metrics */}
                <p className="text-sm font-medium text-slate-300 mb-2">
                  {project.subtitle}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/50 border border-slate-700/40 text-xs font-mono text-emerald-400 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{project.metrics}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Architecture Highlights */}
                <div className="space-y-2 mb-6">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-normal">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-800/60 border border-slate-700/50 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
                >
                  <span>{project.isPrototype ? "Review Prototype" : content.liveDemoBtn}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/70 hover:border-slate-600 transition-all duration-200"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{content.sourceCodeBtn}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
