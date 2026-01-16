'use client';

import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

import { TechBadge } from './tech-badge';
import type { Project } from './types';

interface FeaturedProjectCardProps {
  project: Project;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const descriptionPoints = Array.isArray(project.description)
    ? project.description
    : [project.description];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      }}
      className="group relative col-span-1 md:col-span-2"
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-40" />
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative rounded-3xl border border-white/20 bg-white/50 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-indigo-500/20 dark:border-white/10 dark:bg-zinc-900/50">
        
        {/* Featured badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1.5 dark:border-indigo-500/30 dark:from-indigo-500/10 dark:to-purple-500/10">
          <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Featured Project
          </span>
        </div>

        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
              {project.title}
            </h3>
            {project.period && (
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                {project.period}
              </p>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="ml-6 flex gap-3">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-200/50 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/30 dark:border-indigo-500/30 dark:from-indigo-500/20 dark:to-purple-500/20 dark:text-indigo-400"
                aria-label="View Live Demo"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200/50 bg-white/80 text-zinc-600 transition-all duration-200 hover:scale-110 hover:bg-zinc-100 hover:text-zinc-900 hover:shadow-lg dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
              aria-label="View on GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Description bullets */}
        <ul className="mb-6 space-y-3">
          {descriptionPoints.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              <span className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base">
                {point}
              </span>
            </li>
          ))}
        </ul>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} tech={tech} size="md" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

