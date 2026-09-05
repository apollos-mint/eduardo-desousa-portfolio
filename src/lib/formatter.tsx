import React from 'react';

/**
 * Parses text and wraps content in parentheses (and key terms like "Lean Six Sigma Black Belt")
 * with a strong tag and high-contrast typography in both light and dark themes.
 */
export function renderFormattedText(text: string): React.ReactNode {
  if (!text) return null;

  // Split on parentheses groups: captures ( ... )
  const parts = text.split(/(\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith('(') && part.endsWith(')')) {
      return (
        <strong
          key={`paren-${index}`}
          className="font-bold text-slate-950 dark:text-white"
        >
          {part}
        </strong>
      );
    }

    // Check for "Lean Six Sigma Black Belt" outside parentheses
    if (part.includes('Lean Six Sigma Black Belt')) {
      const subParts = part.split(/(Lean Six Sigma Black Belt)/g);
      return (
        <React.Fragment key={`frag-${index}`}>
          {subParts.map((sub, subIndex) =>
            sub === 'Lean Six Sigma Black Belt' ? (
              <strong
                key={`lss-${index}-${subIndex}`}
                className="font-bold text-slate-950 dark:text-white"
              >
                {sub}
              </strong>
            ) : (
              sub
            )
          )}
        </React.Fragment>
      );
    }

    return part;
  });
}
