'use client';

import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';

import { TechBadge } from './tech-badge';
import type { Project } from './types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className="group relative h-full"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative flex h-full flex-col rounded-2xl border border-white/20 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-indigo-500/30 group-hover:shadow-2xl group-hover:shadow-indigo-500/10 dark:border-white/10 dark:bg-zinc-900/40 dark:group-hover:border-indigo-400/30 dark:group-hover:shadow-indigo-500/20">
        
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {project.title}
            </h3>
            {project.period && (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {project.period}
              </p>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="ml-4 flex gap-2">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200/50 bg-indigo-50/80 text-indigo-600 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-indigo-100 hover:shadow-lg hover:shadow-indigo-500/20 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20"
                aria-label="View Live Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/50 bg-white/80 text-zinc-500 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-zinc-100 hover:text-zinc-900 hover:shadow-lg dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50 dark:hover:text-white"
              aria-label="View on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {typeof project.description === 'string' ? project.description : project.description[0]}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

