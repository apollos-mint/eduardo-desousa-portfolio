'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  syncProfileWithClarity,
  boostIntentScore,
  sendToClarity,
} from '@/lib/telemetry/tracker';

export default function TelemetryProvider() {
  const pathname = usePathname();
  const scrollMilestones = useRef({ '25': false, '50': false, '75': false, '100': false });

  // 1. Initialize Profile & Clarity Sync on mount and route change
  useEffect(() => {
    // Initial sync
    syncProfileWithClarity();
    sendToClarity('current_route', pathname);

    // Boost score if visiting a high-value case study
    if (pathname.includes('/experience/')) {
      boostIntentScore(25, 'view_case_study', { case_slug: pathname.split('/').pop() });
    } else if (pathname.includes('/skills/')) {
      boostIntentScore(15, 'view_skill_detail', { skill_slug: pathname.split('/').pop() });
    } else if (pathname.includes('/certifications')) {
      boostIntentScore(20, 'view_certifications');
    } else if (pathname.includes('/contact')) {
      boostIntentScore(30, 'view_contact_page');
    }

    // Reset scroll milestones for the current page
    scrollMilestones.current = { '25': false, '50': false, '75': false, '100': false };
  }, [pathname]);

  // 2. Dwell Time Tracker (Time on Page)
  useEffect(() => {
    const timer30 = setTimeout(() => boostIntentScore(10, 'dwell_30s'), 30000);
    const timer60 = setTimeout(() => boostIntentScore(15, 'dwell_60s'), 60000);
    const timer120 = setTimeout(() => boostIntentScore(20, 'dwell_120s'), 120000);
    const timer300 = setTimeout(() => boostIntentScore(25, 'dwell_300s'), 300000);

    return () => {
      clearTimeout(timer30);
      clearTimeout(timer60);
      clearTimeout(timer120);
      clearTimeout(timer300);
    };
  }, [pathname]);

  // 3. Scroll Depth Tracker
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPct = Math.round((window.scrollY / docHeight) * 100);

      if (scrollPct >= 25 && !scrollMilestones.current['25']) {
        scrollMilestones.current['25'] = true;
        boostIntentScore(5, 'scroll_25', { scroll_depth: '25%' });
      }
      if (scrollPct >= 50 && !scrollMilestones.current['50']) {
        scrollMilestones.current['50'] = true;
        boostIntentScore(5, 'scroll_50', { scroll_depth: '50%' });
      }
      if (scrollPct >= 75 && !scrollMilestones.current['75']) {
        scrollMilestones.current['75'] = true;
        boostIntentScore(10, 'scroll_75', { scroll_depth: '75%' });
      }
      if (scrollPct >= 95 && !scrollMilestones.current['100']) {
        scrollMilestones.current['100'] = true;
        boostIntentScore(10, 'scroll_100', { scroll_depth: '100%' });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // 4. Global High-Intent Click Interceptor
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = target.textContent || '';

      // A. CV Download Clicks
      if (href.endsWith('.pdf') || href.includes('Resume') || href.includes('cv_')) {
        boostIntentScore(50, 'cv_download_click', {
          cv_downloaded: 'true',
          cv_file: href.split('/').pop(),
          vip_lead: 'true',
        });
      }

      // B. Email / Booking Clicks
      if (href.startsWith('mailto:') || text.toLowerCase().includes('email') || text.toLowerCase().includes('correo')) {
        boostIntentScore(35, 'email_click', { contact_initiated: 'email' });
      }

      // C. LinkedIn Link Clicks
      if (href.includes('linkedin.com')) {
        boostIntentScore(30, 'linkedin_click', { contact_initiated: 'linkedin' });
      }

      // D. Executive Calendar / Contact Buttons
      if (href.includes('/contact') || text.toLowerCase().includes('contact') || text.toLowerCase().includes('booking')) {
        boostIntentScore(25, 'contact_btn_click');
      }
    };

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
