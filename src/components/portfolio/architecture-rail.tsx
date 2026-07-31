import type { ArchitectureStep } from '@/data/case-studies';

interface ArchitectureRailProps {
  steps: readonly ArchitectureStep[];
  compact?: boolean;
}

export function ArchitectureRail({
  steps,
  compact = false,
}: ArchitectureRailProps) {
  return (
    <ol
      className={
        compact
          ? 'architecture-rail architecture-rail--compact'
          : 'architecture-rail'
      }
      aria-label="System architecture">
      {steps.map((step, index) => (
        <li className="architecture-step" key={`${step.name}-${step.detail}`}>
          <span className="architecture-step__index">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="architecture-step__content">
            <strong>{step.name}</strong>
            <small>{step.detail}</small>
          </span>
          {index < steps.length - 1 ? (
            <span className="architecture-step__arrow" aria-hidden="true">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
