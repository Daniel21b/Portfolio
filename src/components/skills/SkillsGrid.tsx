'use client';

import { motion } from 'motion/react';
import SkillCard from './SkillCard';
import { skills, categoryLabels } from './types';
import type { SkillCategory } from './types';

const SkillsGrid = () => {
  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<SkillCategory, typeof skills>
  );

  const categoryOrder: SkillCategory[] = ['languages', 'analysis', 'cloud', 'ml', 'databases'];

  return (
    <div className="space-y-8">
      {categoryOrder.map((category) => {
        const categorySkills = skillsByCategory[category];
        if (!categorySkills || categorySkills.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              {categoryLabels[category]}
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsGrid;
