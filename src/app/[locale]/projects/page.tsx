import { selectedCaseStudies } from '@/data/case-studies';
import { routing } from '@/i18n/routing';

import { CaseOverview } from '@/components/portfolio/case-overview';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Selected work',
  description:
    'An index of Daniel Berhane’s selected data pipeline and compliance system case studies.',
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
        <p className="eyebrow">Work index / 03 selected cases</p>
        <h1>Systems with the proof attached.</h1>
        <p>
          This is the compact index. Each case opens into the contribution
          boundary, architecture, decisions, evidence, and limitations.
        </p>
        <a href={`/${locale}/#work`}>Return to homepage selection →</a>
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
