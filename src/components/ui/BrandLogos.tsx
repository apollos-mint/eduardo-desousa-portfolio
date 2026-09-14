import React from 'react';

interface BrandLogoProps {
  name: string;
  className?: string;
}

export default function BrandLogo({ name, className = 'w-6 h-6' }: BrandLogoProps) {
  const norm = name.toUpperCase().trim();

  // HQ PACK
  if (norm.includes('HQ') || norm.includes('HQPACK')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 130 40" className={className}>
        <rect width="130" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <rect x="6" y="6" width="28" height="28" rx="4" fill="#0284c7" />
        <path d="M14,14 L26,14 L26,26 L14,26 Z M14,20 L26,20 M20,14 L20,26" stroke="#ffffff" strokeWidth="1.5" fill="none" />
        <text x="82" y="26" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          HQ PACK
        </text>
      </svg>
    );
  }

  // HAPAG-LLOYD
  if (norm.includes('HAPAG') || norm.includes('LLOYD')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 140 40" className={className}>
        <rect width="140" height="40" rx="8" fill="#00244d" />
        <rect x="6" y="6" width="28" height="28" rx="4" fill="#ff6600" />
        <path d="M12,20 L28,20 M20,12 L20,28" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
        <text x="86" y="26" fontSize="14" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          Hapag-Lloyd
        </text>
      </svg>
    );
  }

  // MAERSK
  if (norm.includes('MAERSK')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 130 40" className={className}>
        <rect width="130" height="40" rx="8" fill="#42b0d5" />
        <polygon points="20,10 23,17 30,17 25,21 27,28 20,24 13,28 15,21 10,17 17,17" fill="#ffffff" />
        <text x="80" y="26" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          MAERSK
        </text>
      </svg>
    );
  }

  // MSC
  if (norm.includes('MSC')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 110 40" className={className}>
        <rect width="110" height="40" rx="8" fill="#001838" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="55" y="27" fontSize="22" fontWeight="900" fontFamily="serif" textAnchor="middle" fill="#f59e0b">
          MSC
        </text>
      </svg>
    );
  }

  // ASML
  if (norm.includes('ASML')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" fill="currentColor" className={className}>
        <rect width="120" height="40" rx="8" fill="#002b49" />
        <text x="60" y="27" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#00a3e0">
          ASML
        </text>
      </svg>
    );
  }

  // BMW
  if (norm.includes('BMW')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="48" fill="#000000" stroke="#666666" strokeWidth="2" />
        <circle cx="50" cy="50" r="44" fill="#000000" />
        <text x="50" y="18" fontSize="12" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          BMW
        </text>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#ffffff" strokeWidth="2" />
        <path d="M50,20 A30,30 0 0,1 80,50 L50,50 Z" fill="#0066b1" />
        <path d="M80,50 A30,30 0 0,1 50,80 L50,50 Z" fill="#ffffff" />
        <path d="M50,80 A30,30 0 0,1 20,50 L50,50 Z" fill="#0066b1" />
        <path d="M20,50 A30,30 0 0,1 50,20 L50,50 Z" fill="#ffffff" />
      </svg>
    );
  }

  // MINI COOPER
  if (norm.includes('MINI')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 140 50" className={className}>
        <path d="M10,25 L40,15 L40,35 Z" fill="#94a3b8" />
        <path d="M130,25 L100,15 L100,35 Z" fill="#94a3b8" />
        <circle cx="70" cy="25" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <text x="70" y="31" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          MINI
        </text>
      </svg>
    );
  }

  // BOSCH
  if (norm.includes('BOSCH')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#1e293b" stroke="#e11d48" strokeWidth="1.5" />
        <circle cx="22" cy="20" r="10" fill="none" stroke="#e11d48" strokeWidth="3" />
        <rect x="18" y="14" width="8" height="12" fill="#e11d48" />
        <text x="70" y="26" fontSize="18" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          BOSCH
        </text>
      </svg>
    );
  }

  // ZEISS
  if (norm.includes('ZEISS')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#002f6c" />
        <text x="60" y="27" fontSize="20" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          ZEISS
        </text>
      </svg>
    );
  }

  // BOEING
  if (norm.includes('BOEING')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#0033a0" />
        <text x="60" y="26" fontSize="18" fontWeight="900" fontStyle="italic" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          BOEING
        </text>
      </svg>
    );
  }

  // AIRBUS
  if (norm.includes('AIRBUS')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#00205b" />
        <text x="60" y="26" fontSize="18" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          AIRBUS
        </text>
      </svg>
    );
  }

  // SAMSUNG
  if (norm.includes('SAMSUNG')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 130 40" className={className}>
        <ellipse cx="65" cy="20" rx="60" ry="18" fill="#1428a0" />
        <text x="65" y="26" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          SAMSUNG
        </text>
      </svg>
    );
  }

  // NEWAYS
  if (norm.includes('NEWAYS')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
        <text x="60" y="26" fontSize="17" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#10b981">
          NEWAYS
        </text>
      </svg>
    );
  }

  // FRENCKEN
  if (norm.includes('FRENCKEN')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 130 40" className={className}>
        <rect width="130" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="65" y="26" fontSize="16" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#38bdf8">
          FRENCKEN
        </text>
      </svg>
    );
  }

  // VDL
  if (norm.includes('VDL')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 110 40" className={className}>
        <rect width="110" height="40" rx="8" fill="#dc2626" />
        <text x="55" y="27" fontSize="22" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          VDL
        </text>
      </svg>
    );
  }

  // ZF
  if (norm.includes('ZF')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 100 40" className={className}>
        <circle cx="20" cy="20" r="14" fill="#0284c7" />
        <text x="20" y="25" fontSize="14" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          ZF
        </text>
        <text x="62" y="26" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          GROUP
        </text>
      </svg>
    );
  }

  // BROSE
  if (norm.includes('BROSE')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 110 40" className={className}>
        <rect width="110" height="40" rx="8" fill="#e11d48" />
        <text x="55" y="26" fontSize="18" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          brose
        </text>
      </svg>
    );
  }

  // TÜV
  if (norm.includes('TÜV') || norm.includes('TUV')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 45" className={className}>
        <polygon points="60,2 115,22 60,42 5,22" fill="#0284c7" />
        <text x="60" y="28" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          TÜV
        </text>
      </svg>
    );
  }

  // ISO 9001
  if (norm.includes('ISO')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#047857" />
        <text x="60" y="26" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          ISO 9001
        </text>
      </svg>
    );
  }

  // GOOGLE
  if (norm.includes('GOOGLE')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#ffffff" stroke="#e2e8f0" />
        <text x="60" y="26" fontSize="17" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#4285F4">
          Google
        </text>
      </svg>
    );
  }

  // NEXT.JS
  if (norm.includes('NEXT')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#000000" stroke="#334155" strokeWidth="1" />
        <text x="60" y="26" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          Next.js
        </text>
      </svg>
    );
  }

  // MAKE
  if (norm.includes('MAKE')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#6c47ff" />
        <text x="60" y="26" fontSize="17" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          make
        </text>
      </svg>
    );
  }

  // ZAPIER
  if (norm.includes('ZAPIER')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#ff4a00" />
        <text x="60" y="26" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          _zapier
        </text>
      </svg>
    );
  }

  // LEAN SIX SIGMA
  if (norm.includes('LEAN') || norm.includes('SIGMA')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 130 40" className={className}>
        <rect width="130" height="40" rx="8" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
        <rect x="6" y="6" width="30" height="28" rx="4" fill="#0891b2" />
        <text x="21" y="25" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          6σ
        </text>
        <text x="80" y="25" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#38bdf8">
          Six Sigma
        </text>
      </svg>
    );
  }

  // ERP ISAH
  if (norm.includes('ISAH')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <rect x="6" y="6" width="28" height="28" rx="4" fill="#0284c7" />
        <path d="M12,20 L28,20 M20,12 L20,28" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <text x="75" y="25" fontSize="14" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          ERP ISAH
        </text>
      </svg>
    );
  }

  // CLEANROOM CLASS 5 / ISO 14644
  if (norm.includes('CLEANROOM') || norm.includes('CLASS 5') || norm.includes('14644')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 130 40" className={className}>
        <rect width="130" height="40" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="10" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="4" fill="#6ee7b7" />
        <text x="78" y="25" fontSize="12" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#a7f3d0">
          ISO Class 5
        </text>
      </svg>
    );
  }

  // 8D RCA
  if (norm.includes('8D') || norm.includes('RCA')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="12" fill="#4338ca" />
        <text x="20" y="25" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          8D
        </text>
        <text x="70" y="25" fontSize="14" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#c7d2fe">
          RCA Hub
        </text>
      </svg>
    );
  }

  // GAGE R&R
  if (norm.includes('GAGE') || norm.includes('R&R')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#042f2e" stroke="#14b8a6" strokeWidth="1.5" />
        <path d="M12,24 L16,14 L24,14 L28,24 Z" fill="none" stroke="#2dd4bf" strokeWidth="2" />
        <circle cx="20" cy="18" r="2" fill="#ffffff" />
        <text x="72" y="25" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          Gage R&R
        </text>
      </svg>
    );
  }

  // SPC METROLOGY
  if (norm.includes('SPC') || norm.includes('METROLOGY')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
        <path d="M10,26 Q18,26 20,14 Q22,26 30,26" fill="none" stroke="#38bdf8" strokeWidth="2" />
        <text x="72" y="25" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#e0f2fe">
          SPC Control
        </text>
      </svg>
    );
  }

  // VCA VOL
  if (norm.includes('VCA') || norm.includes('VOL')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
        <polygon points="20,10 28,15 28,25 20,30 12,25 12,15" fill="#16a34a" stroke="#86efac" strokeWidth="1" />
        <text x="20" y="23" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          ✓
        </text>
        <text x="72" y="25" fontSize="13" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" fill="#f0fdf4">
          VCA VOL
        </text>
      </svg>
    );
  }

  // ASANA
  if (norm.includes('ASANA')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 120 40" className={className}>
        <rect width="120" height="40" rx="8" fill="#1e1e2d" stroke="#f06a6a" strokeWidth="1.5" />
        <circle cx="20" cy="17" r="4.5" fill="#f06a6a" />
        <circle cx="13" cy="27" r="4.5" fill="#f06a6a" />
        <circle cx="27" cy="27" r="4.5" fill="#f06a6a" />
        <text x="70" y="25" fontSize="14" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          Asana
        </text>
      </svg>
    );
  }

  // JIRA
  if (norm.includes('JIRA')) {
    return (
      <svg role="img" aria-label={name} viewBox="0 0 110 40" className={className}>
        <rect width="110" height="40" rx="8" fill="#0747a6" stroke="#2684ff" strokeWidth="1.5" />
        <path d="M12,20 L20,12 L20,28 Z M20,12 L28,20 L20,28 Z" fill="#ffffff" />
        <text x="68" y="25" fontSize="14" fontWeight="800" fontFamily="sans-serif" textAnchor="middle" fill="#ffffff">
          Jira
        </text>
      </svg>
    );
  }

  // Fallback icon with safe clean SVG sizing (no text overflow)
  return (
    <svg role="img" aria-label={name} viewBox="0 0 40 40" className={className}>
      <rect width="40" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="5" fill="#38bdf8" />
      <path d="M20 8v5 M20 27v5 M8 20h5 M27 20h5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
