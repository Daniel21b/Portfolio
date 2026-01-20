'use client';

import { SkillIcon } from './skill-icons';
import type { SkillCardProps, ProficiencyLevel } from './types';

const proficiencyColors: Record<ProficiencyLevel, string> = {
  Expert: 'bg-green-500',
  Advanced: 'bg-blue-500',
  Proficient: 'bg-amber-500',
};

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className="group h-40 w-full [perspective:1000px]">
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm [backface-visibility:hidden] dark:border-zinc-700 dark:bg-zinc-800/50"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg p-2.5"
            style={{
              backgroundColor: `${skill.color}15`,
              color: skill.color,
            }}
          >
            <SkillIcon name={skill.name} />
          </div>
          <span className="text-center text-sm font-medium text-zinc-900 dark:text-white">
            {skill.name}
          </span>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-zinc-700 dark:bg-zinc-800/50"
        >
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${proficiencyColors[skill.proficiency]}`}
          >
            {skill.proficiency}
          </span>
          <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
            {skill.usageContext}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
