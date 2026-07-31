import { otherWork, selectedCaseStudies } from '@/data/case-studies';
import { routing } from '@/i18n/routing';
import { ArrowRight, Github, Mail } from 'lucide-react';

import { CaseOverview } from '@/components/portfolio/case-overview';
import { SectionHeading } from '@/components/portfolio/section-heading';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data pipelines and compliance systems',
  description:
    'Selected case studies in data pipelines, compliance systems, cloud workflows, and audit-friendly interfaces by Daniel Berhane.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const operatingPrinciples = [
  {
    index: 'P-01',
    title: 'Traceable transformations',
    detail:
      'A result should be traceable back through the schema, transformation, and source that produced it.',
  },
  {
    index: 'P-02',
    title: 'Human review at uncertain edges',
    detail:
      'OCR and model confidence should decide what is automated and what is routed to a person.',
  },
  {
    index: 'P-03',
    title: 'Measured claims',
    detail:
      'A metric needs a baseline, protocol, sample, and evidence path before it becomes portfolio copy.',
  },
  {
    index: 'P-04',
    title: 'Explicit failure modes',
    detail:
      'Constraints and non-production-ready decisions are part of the system description, not fine print.',
  },
] as const;

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="hero__kicker">
            Daniel Berhane — Data + backend systems
          </p>
          <h1 id="hero-title">
            Data pipelines and compliance systems that hold up under real
            constraints.
          </h1>
          <p className="hero__intro">
            I build Python and SQL data systems, cloud workflows, and
            audit-friendly interfaces—and I show where the evidence ends.
          </p>
          <div className="hero__actions">
            <a className="button button--signal" href="#work">
              Read the case studies
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            <a
              className="button button--text"
              href="mailto:dberhane@terpmail.umd.edu">
              Email Daniel
              <Mail aria-hidden="true" size={16} />
            </a>
          </div>
        </div>

        <aside className="proof-rail" aria-label="Portfolio proof summary">
          <div className="proof-rail__header">
            <span>Proof index</span>
            <span>Current selection</span>
          </div>
          <dl>
            <div>
              <dt>Selected cases</dt>
              <dd>03</dd>
            </div>
            <div>
              <dt>Public source repositories</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>Live product / demo links</dt>
              <dd>02</dd>
            </div>
          </dl>
          <p>
            <span aria-hidden="true">↳</span> The Streamlit demo may need to
            wake.
          </p>
        </aside>
      </section>

      <section className="home-section" id="work" aria-labelledby="work-title">
        <SectionHeading
          index="01"
          title="Selected work"
          description="Three systems, presented as cases: outcome, ownership, architecture, proof, and limits."
        />
        <div className="case-list">
          {selectedCaseStudies.map((caseStudy) => (
            <CaseOverview
              key={caseStudy.slug}
              caseStudy={caseStudy}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <section
        className="home-section"
        id="about"
        aria-labelledby="principles-title">
        <SectionHeading
          index="02"
          title="Operating principles"
          description="The standards I use to decide whether a data system—and the story told about it—deserves trust."
        />
        <div className="principles-grid">
          {operatingPrinciples.map((principle) => (
            <article key={principle.index}>
              <span>{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </article>
          ))}
        </div>
        <p className="about-note">
          I earned a B.S. in Computer Science in August 2025 and focus on data
          engineering, analytics engineering, and backend systems where
          traceability matters. The work above is deliberately narrow; the goal
          is to make my judgment inspectable.
        </p>
      </section>

      <section className="home-section" aria-labelledby="other-work-title">
        <SectionHeading
          index="03"
          title="Other work"
          description="Employer work is included at the level I can support publicly."
        />
        <div className="other-work-list">
          {otherWork.map((item) => (
            <article key={item.organization}>
              <h3>{item.organization}</h3>
              <p>{item.work}</p>
              <span>{item.stack}</span>
              <small>{item.note}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-block" aria-labelledby="contact-title">
        <p className="eyebrow">Available for data + backend roles</p>
        <h2 id="contact-title">
          Need someone who can build the system and explain its failure modes?
        </h2>
        <div>
          <a
            className="button button--signal"
            href="mailto:dberhane@terpmail.umd.edu">
            Start a conversation
            <Mail aria-hidden="true" size={17} />
          </a>
          <a
            className="button button--dark"
            href="https://github.com/Daniel21b"
            target="_blank"
            rel="noreferrer noopener">
            GitHub
            <Github aria-hidden="true" size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
