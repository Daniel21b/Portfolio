'use client';

import { getTechColor } from './types';

interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md';
}

export function TechBadge({ tech, size = 'sm' }: TechBadgeProps) {
  const colors = getTechColor(tech);
  const sizeClasses = size === 'sm' 
    ? 'px-2.5 py-1 text-xs' 
    : 'px-3 py-1.5 text-sm';

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${colors.bg} ${colors.text} ${colors.darkBg} ${colors.darkText}
        ${sizeClasses}
        transition-all duration-200
        hover:scale-105 hover:shadow-sm
      `}
    >
      {tech}
    </span>
  );
}

