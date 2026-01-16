import { routing } from '@/i18n/routing';
import { Database, BarChart3, ExternalLink } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import env from '@/env.mjs';
import { FeaturedProjectCard } from '@/components/projects/featured-project-card';
import { ProjectCard } from '@/components/projects/project-card';
import type { Project } from '@/components/projects/types';

import type { Metadata } from 'next/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale });
  return {
    title: t('main.projects'),
    openGraph: {
      images: [
        `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('main.projects')}`,
      ],
    },
    twitter: {
      images: [
        `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('main.projects')}`,
      ],
    },
  };
}

// Featured project - spans full width
const featuredProject: Project = {
  title: 'Automated Invoice Processing Pipeline',
  description: [
    'Designed an event-driven architecture that eliminates manual data entry by automatically triggering extraction pipelines upon file upload, reducing processing time by 95%.',
    'Migrated real-time invoice processing to a scheduled Airflow batch architecture, optimizing compute resource usage by processing uploads in hourly micro-batches.',
    'Implemented unstructured-to-structured data transformation using AI-based OCR to parse PDF invoices and normalize them into a relational PostgreSQL schema.',
  ],
  technologies: ['Python', 'PostgreSQL', 'Streamlit', 'AWS Lambda', 'AWS S3', 'AWS RDS', 'AWS Textract'],
  github: 'https://github.com/Daniel21b/invoice_pipeline',
  featured: true,
};

// Other projects
const projects: Project[] = [
  {
    title: 'Tech Job Market Trends Dashboard',
    description:
      'Scraped job postings from career sites using BeautifulSoup to track company hiring patterns. Standardized company names with Pandas and analyzed month-over-month position changes with NumPy. Visualized hiring trends using Matplotlib.',
    technologies: ['Python', 'Pandas', 'BeautifulSoup', 'Matplotlib', 'NumPy'],
    period: 'Jan 2024 - Mar 2024',
    github: 'https://github.com/Daniel21b/Job-Market-Analytics',
    liveDemo: 'https://job-market-analytics-fx.streamlit.app/',
  },
  {
    title: 'DC Bikeshare Demand & Peak Usage Analysis',
    description:
      'Processed 2+ million Bikeshare trips using Pandas to identify usage patterns across DC metro stations. Calculated statistical correlations between weather and ridership. Generated Seaborn heatmaps and Plotly interactive visualizations.',
    technologies: ['Python', 'Pandas', 'Seaborn', 'Plotly', 'Looker'],
    period: 'Aug 2024 - Oct 2024',
    github: 'https://github.com/Daniel21b/DC-Bikeshare-Demand-Analysis',
    liveDemo: 'https://dc-bikeshare-demand-analysis-ycklasmcgsozwy87bsdgzr.streamlit.app/',
  },
  {
    title: 'Open Source Contribution - Crawl4AI',
    description:
      'Built async scraping pipelines with Crawl4AI handling 500+ pages, implementing session management. Enhanced FastAPI endpoints with JWT authentication, reducing unauthorized access attempts by 95%.',
    technologies: ['Python', 'Crawl4AI', 'FastAPI', 'JWT', 'AsyncIO'],
    period: 'Mar 2025 - May 2025',
    github: 'https://github.com/unclecode/crawl4ai/pull/1630',
  },
];

const services = [
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description:
      'ETL pipeline development, data visualization with Power BI and Tableau, SQL optimization, and business intelligence reporting.',
    skills: ['Python', 'SQL', 'Power BI', 'Tableau', 'AWS', 'Snowflake', 'dbt'],
  },
  {
    icon: Database,
    title: 'Backend Development',
    description:
      'Designing and implementing RESTful APIs, database architecture, and server-side applications.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'MongoDB', 'AWS'],
  },
];

const ProjectsPage = async ({ params }: PageProps<'/[locale]/projects'>) => {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale });

  return (
    <div className="mx-auto mb-16 flex max-w-5xl flex-col items-start justify-center px-4">
      {/* Page Header */}
      <div className="mb-12 w-full">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
          {t('main.projects')}
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A collection of my data engineering, analytics, and software engineering projects —
          from ETL pipelines to machine learning applications.
        </p>
      </div>

      {/* Services Section */}
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
        Services
      </h2>
      <div className="mb-16 grid w-full gap-4 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="group relative flex flex-col rounded-2xl border border-white/20 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/30 hover:shadow-xl dark:border-white/10 dark:bg-zinc-900/40 dark:hover:border-indigo-400/30"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20">
              <service.icon className="h-6 w-6 text-indigo-500 dark:text-indigo-400" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-white">
              {service.title}
            </h3>
            <p className="mb-4 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Projects - Bento Grid */}
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
        Featured Projects
      </h2>

      <div className="mb-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {/* Featured Project - Full Width */}
        <FeaturedProjectCard project={featuredProject} />

        {/* Other Projects */}
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index + 1} />
        ))}
      </div>

      {/* GitHub Link */}
      <a
        href="https://github.com/Daniel21b?tab=repositories"
        target="_blank"
        rel="noreferrer noopener"
        className="group mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200/50 bg-white/60 px-5 py-2.5 text-sm font-medium text-zinc-600 backdrop-blur-sm transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
      >
        <span>View all repositories on GitHub</span>
        <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
};

export default ProjectsPage;
