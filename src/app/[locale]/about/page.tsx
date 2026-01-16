import { routing } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import env from '@/env.mjs';
import Tools from '@/components/tools';
import Timeline from '@/components/timeline';

import type { Metadata } from 'next/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale, namespace: 'main' });
  return {
    title: t('about'),
    openGraph: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('about')}`],
    },
    twitter: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('about')}`],
    },
  };
}

const AboutPage = () => {
  const t = useTranslations();

  // Timeline data for the animated component
  const timelineItems = [
    {
      date: 'June 2025 - September 2025',
      title: t('about-page.timeline.2.title'),
      description: t('about-page.timeline.2.description'),
      link: {
        url: 'https://icatt.net/icatt-applied-data-analytics/',
        label: t('about-page.timeline.learn-more'),
      },
    },
    {
      date: 'June 2024 - August 2024',
      title: t('about-page.timeline.3.title'),
      description: t('about-page.timeline.3.description'),
    },
    {
      date: t('about-page.timeline.1.date'),
      title: t('about-page.timeline.1.title'),
      description: t('about-page.timeline.1.description'),
    },
  ];

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
        {t('main.about')}
      </h1>
      <div className="mb-16 text-zinc-600 dark:text-zinc-400">
        <p className="mb-6">{t('about-page.text-1')}</p>
        <p className="mb-6">{t('about-page.text-2')}</p>
        <p>{t('about-page.text-3')}</p>
      </div>
      <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
        Links
      </h2>
      <div className="prose mb-16 text-zinc-600 dark:text-zinc-400">
        <ul className="list-disc">
          <li>
            GitHub:{' '}
            <a
              href="https://github.com/Daniel21b"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              @Daniel21b
            </a>
          </li>
          <li>
            LinkedIn:{' '}
            <a
              href="https://linkedin.com/in/daniel-berhane"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              linkedin.com/in/daniel-berhane
            </a>
          </li>
          <li>
            Email:{' '}
            <a
              href="mailto:dberhane@terpmail.umd.edu"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              dberhane@terpmail.umd.edu
            </a>
          </li>
        </ul>
      </div>

      <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
        {t('about-page.timeline.title')}
      </h2>
      <Timeline items={timelineItems} />

      <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
        {t('about-page.tools.title')}
      </h2>
      <div className="mb-16">
        <p className="text-zinc-500 dark:text-zinc-400">
          {t('about-page.tools.text')}
        </p>
        <Tools />
      </div>

      <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
        Skills & Technologies
      </h2>
      <p className="mb-6 text-zinc-500 dark:text-zinc-400">
        Here&apos;s my technical stack for data analysis and engineering.
      </p>
      <div className="prose mb-16 text-zinc-600 dark:text-zinc-400">
        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white md:text-xl">
          Programming Languages
        </h3>
        <ul className="list-disc">
          <li>Python, SQL, R, JavaScript, Java</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white md:text-xl">
          Data Analysis & Visualization
        </h3>
        <ul className="list-disc">
          <li>Pandas, NumPy, Matplotlib, Seaborn</li>
          <li>Power BI, Tableau, Looker</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white md:text-xl">
          Data Pipeline & Cloud
        </h3>
        <ul className="list-disc">
          <li>dbt, AWS (Glue, Lambda, EC2), Snowflake</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white md:text-xl">
          Machine Learning & MLOps
        </h3>
        <ul className="list-disc">
          <li>scikit-learn, MLflow</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white md:text-xl">
          Databases & Tools
        </h3>
        <ul className="list-disc">
          <li>MySQL, PostgreSQL, MongoDB</li>
          <li>Git, GitHub Actions, FastAPI</li>
        </ul>
      </div>

      <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
        Profile
      </h2>
      <div className="relative inline-block">
        {/* Glowing background spot */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-pink-500/20 blur-2xl" />
        <Image
          alt="Daniel Berhane profile"
          width={200}
          height={200}
          src="/static/images/portfolio_profile.png"
          className="relative rounded-full ring-2 ring-white/20 dark:ring-white/10"
        />
      </div>
    </>
  );
};

export default AboutPage;
