import { routing } from '@/i18n/routing';
import { ArrowRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import HeroSection from '@/components/hero-section';
import { TechBadge } from '@/components/projects/tech-badge';
import { homepageFeaturedProject, homepageSecondaryProjects } from '@/data/portfolio';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const Index = async ({ params }: PageProps<'/[locale]'>) => {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale });

  return (
    <>
      <HeroSection
        name="Daniel Berhane"
        title={t('index-page.title')}
        intro={t('index-page.intro')}
      />

      <h3
        id="projects"
        className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
        Featured Projects
      </h3>

      {/* Bento Grid Layout */}
      <div className="mb-8 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {/* Featured Project - Full Width */}
        <div className="group relative col-span-1 md:col-span-2">
          {/* Gradient glow */}
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-40" />
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative rounded-2xl border border-white/20 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 group-hover:shadow-2xl dark:border-white/10 dark:bg-zinc-900/50">
            {/* Featured badge */}
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200/50 bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1 dark:border-indigo-500/30 dark:from-indigo-500/10 dark:to-purple-500/10">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Featured</span>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white md:text-2xl">
                  {homepageFeaturedProject.title}
                </h4>
                <ul className="mb-4 space-y-1.5">
                  {homepageFeaturedProject.description.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-indigo-500" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {homepageFeaturedProject.technologies.map((tech) => (
                    <TechBadge key={tech} tech={tech} />
                  ))}
                </div>
              </div>
              <a
                href={homepageFeaturedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/50 bg-white/80 text-zinc-500 transition-all duration-200 hover:scale-110 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700 dark:hover:text-white"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Secondary Projects */}
        {homepageSecondaryProjects.map((project) => (
          <div
            key={project.name}
            className="group relative"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative h-full rounded-2xl border border-white/20 bg-white/40 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.02] group-hover:border-indigo-500/30 group-hover:shadow-xl dark:border-white/10 dark:bg-zinc-900/40 dark:group-hover:border-indigo-400/30">
              <div className="flex items-start justify-between">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {project.name}
                </h4>
                <div className="ml-3 flex gap-2">
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-200/50 bg-indigo-50/80 text-indigo-600 transition-all hover:scale-110 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/50 bg-white/80 text-zinc-500 transition-all hover:scale-110 hover:text-zinc-900 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:text-white"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} size="sm" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={`/${locale}/projects`}
        className="mb-16 mt-4 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
        {t('projects.see-more')}
        <ArrowRight strokeWidth={1.5} className="ml-1 h-4 w-4" />
      </Link>
    </>
  );
};

export default Index;
