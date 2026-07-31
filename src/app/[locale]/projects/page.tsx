import { selectedCaseStudies } from '@/data/case-studies';
import { routing } from '@/i18n/routing';

import { CaseOverview } from '@/components/portfolio/case-overview';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A few data engineering and backend projects built by Daniel Berhane.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ProjectsPage({
  params,
}: PageProps<'/[locale]/projects'>) {
  const { locale } = await params;

  return (
    <div className="index-page">
      <header className="index-page__header">
        <p className="eyebrow">Selected projects</p>
        <h1>A few things I&apos;ve built.</h1>
        <p>
          Each project includes a closer look at what I worked on, the choices I
          made, and what I learned along the way.
        </p>
        <a href={`/${locale}/#work`}>Back to the homepage →</a>
      </header>

      <section className="case-list" aria-label="Selected case studies">
        {selectedCaseStudies.map((caseStudy) => (
          <CaseOverview
            key={caseStudy.slug}
            caseStudy={caseStudy}
            locale={locale}
          />
        ))}
      </section>
    </div>
  );
}
