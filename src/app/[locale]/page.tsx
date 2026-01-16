import { routing } from '@/i18n/routing';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import FeaturedPost from '@/components/blog/featured-post';
import HeroSection from '@/components/hero-section';
import { getBlogPosts } from '@/lib/blog';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const featuredProjects = [
  {
    name: 'Streaming Service Content Performance Pipeline',
    description:
      'Orchestrated automated ETL workflows using n8n to ingest 50K+ daily viewer events. Built Python scripts with Pandas transforming raw event data into aggregated metrics. Designed pipeline loading clean data into Snowflake for real-time analytics.',
    url: 'https://github.com/Daniel21b',
    stargazerCount: 0,
    language: {
      name: 'Python + Snowflake',
      color: '#3572A5',
    },
    tags: ['n8n', 'Python', 'Snowflake', 'ETL'],
  },
  {
    name: 'Tech Job Market Trends Dashboard',
    description:
      'Scraped job postings to track hiring patterns and visualize trends using Python, Pandas, and Matplotlib.',
    url: 'https://github.com/Daniel21b/Job-Market-Analytics',
    liveDemo: 'https://job-market-analytics-fx.streamlit.app/',
    stargazerCount: 0,
    language: {
      name: 'Python',
      color: '#3572A5',
    },
  },
  {
    name: 'DC Bikeshare Demand Analysis',
    description:
      'Processed 2+ million Bikeshare trips using Pandas and SQL to identify peak usage patterns, discovering 8 stations account for 60% of rush-hour demand. Engineered data transformations calculating temporal and geographic metrics. Validated findings through correlation analysis.',
    url: 'https://github.com/Daniel21b/DC-Bikeshare-Demand-Analysis',
    liveDemo: 'https://dc-bikeshare-demand-analysis-ycklasmcgsozwy87bsdgzr.streamlit.app/',
    stargazerCount: 0,
    language: {
      name: 'Python',
      color: '#3572A5',
    },
  },
];

const Index = async ({ params }: PageProps<'/[locale]'>) => {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale });
  
  const allPosts = getBlogPosts()
    .filter((post) => post.language === locale)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  const gradients = [
    'from-[#D8B4FE] via-[#726dde] to-[#818CF8]',
    'from-[#FDE68A] via-[#FCA5A5] to-[#FBBF24]',
    'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]',
  ] as const;
  
  const getGradient = (index: number): string => {
    return gradients[index % gradients.length] ?? gradients[0];
  };

  return (
    <>
      <HeroSection
        name="Daniel Berhane"
        title={t('index-page.title')}
        intro={t('index-page.intro')}
      />

      <h3 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
        Latest Posts
      </h3>

      <div className="flex flex-col gap-6 md:flex-row">
        {allPosts.map((post, index) => (
          <FeaturedPost
            key={post.slug}
            title={post.title}
            slug={post.slug}
            gradient={getGradient(index)}
          />
        ))}
      </div>

      <Link
        href={`/${locale}/blog`}
        className="mb-16 mt-8 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-zinc-500 transition-all hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200">
        {t('index-page.posts.read-all')}
        <ArrowRight strokeWidth={1.5} className="ml-1 h-4 w-4" />
      </Link>

      <h3
        id="projects"
        className="mb-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
        Featured Projects
      </h3>

      <div className="mb-8 space-y-4">
        {featuredProjects.map((project, index) => (
          <div
            key={index}
            className="group rounded-xl border border-zinc-200/80 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 dark:border-white/10 dark:bg-zinc-900/50 dark:hover:border-indigo-400/50 dark:hover:shadow-indigo-500/10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                  {project.name}
                </h4>
                <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Language pill */}
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
                  {/* Tag pills */}
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ml-4 flex gap-2">
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-indigo-200 bg-indigo-50 p-2 text-indigo-600 transition-colors hover:bg-indigo-100 hover:text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-300"
                    aria-label="View Live Demo">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50 dark:hover:text-white"
                  aria-label="View on GitHub">
                  <Github className="h-5 w-5" />
                </a>
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
