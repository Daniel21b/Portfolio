'use client';

import { Github, Home, StarIcon } from 'lucide-react';
import { motion } from 'motion/react';

import type { Projects } from '@/lib/types';

const Project = ({ projects }: { projects: Projects[] | null }) => {
  return (
    <>
      {projects &&
        projects.length > 0 &&
        projects.map((project: Projects, index: number) => (
          <motion.div
            key={index}
            id={project.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group my-3 rounded-xl border border-zinc-200/80 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-indigo-400/50 dark:hover:shadow-indigo-500/10">
            <div className="flex justify-between">
              <div className="flex items-center text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                {project.name}
              </div>

              <div className="flex gap-3">
                {project.homepage && project.homepage !== '' && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="homepage"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400">
                    <Home strokeWidth={1.5} className="h-5 w-5" />
                  </a>
                )}

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-400 transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-700/50 dark:hover:text-white">
                  <Github strokeWidth={1.5} className="h-5 w-5" />
                </a>
              </div>
            </div>

            <p className="mt-2 text-balance text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {/* Language pill */}
              {project.language.color !== '' && (
                <div
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${project.language.color}15`,
                    color: project.language.color,
                  }}
                >
                  <div
                    className="mr-1.5 h-2 w-2 rounded-full"
                    style={{ backgroundColor: project.language.color }}
                  />
                  {project.language.name}
                </div>
              )}

              {project.stargazerCount > 0 && (
                <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
                  <StarIcon className="mr-1.5 h-4 w-4 text-amber-500" />
                  {project.stargazerCount}
                </div>
              )}
            </div>
          </motion.div>
        ))}
    </>
  );
};

export default Project;
