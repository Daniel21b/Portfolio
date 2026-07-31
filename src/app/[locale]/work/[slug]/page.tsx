import {
  getAdjacentCases,
  getCaseStudy,
  selectedCaseStudies,
} from '@/data/case-studies';
import { routing } from '@/i18n/routing';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
} from 'lucide-react';
import { notFound } from 'next/navigation';

import { ArchitectureRail } from '@/components/portfolio/architecture-rail';
import { CaseLink } from '@/components/portfolio/case-link';

import type { EvidenceStatus } from '@/data/case-studies';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    selectedCaseStudies.map((caseStudy) => ({
      locale,
      slug: caseStudy.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {};
  }

  return {
    title: caseStudy.title,
    description: caseStudy.outcome,
  };
}

const statusDetails: Record<
  EvidenceStatus,
  { label: string; icon: typeof Check }
> = {
  verified: { label: 'Verified', icon: Check },
  limited: { label: 'Limited', icon: Minus },
  withheld: { label: 'Withheld', icon: AlertTriangle },
};

export default async function CaseStudyPage({
  params,
}: PageProps<'/[locale]/work/[slug]'>) {
  const { locale, slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const adjacent = getAdjacentCases(caseStudy.slug);

  return (
    <article className="case-page">
      <header className="case-hero">
        <div className="case-hero__topline">
          <a href={`/${locale}/#work`}>
            <ArrowLeft aria-hidden="true" size={15} /> Selected work
          </a>
          <span>Case {caseStudy.number} / 03</span>
        </div>

        <div className="case-hero__title">
          <span className="case-number case-number--large">
            {caseStudy.number}
          </span>
          <div>
            <p className="eyebrow">{caseStudy.role}</p>
            <h1>{caseStudy.title}</h1>
            <p>{caseStudy.outcome}</p>
          </div>
        </div>

        <div className="case-hero__actions" aria-label="Project proof links">
          {caseStudy.links.map((link) => (
            <CaseLink key={link.href} link={link} />
          ))}
        </div>

        <dl className="metadata-rail">
          <div>
            <dt>Role</dt>
            <dd>{caseStudy.role}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{caseStudy.year}</dd>
          </div>
          <div>
            <dt>Scope</dt>
            <dd>{caseStudy.scope}</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>{caseStudy.evidenceStatus}</dd>
          </div>
        </dl>
      </header>

      <section
        className="case-section case-section--split"
        aria-labelledby="problem">
        <div className="case-section__label">
          <span>01</span>
          <h2 id="problem">Problem + constraints</h2>
        </div>
        <div className="case-section__content">
          <p className="case-lede">{caseStudy.problem}</p>
          <ul className="constraint-list">
            {caseStudy.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="case-section" aria-labelledby="boundary">
        <div className="case-section__label">
          <span>02</span>
          <h2 id="boundary">Contribution boundary</h2>
        </div>
        <div className="claim-boundary">
          <div className="claim-boundary__mine">
            <span>My contribution</span>
            <ul>
              {caseStudy.contribution.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="claim-boundary__outside">
            <span>Outside my claim</span>
            <ul>
              {caseStudy.outsideClaim.map((item) => (
                <li key={item}>
                  <Minus aria-hidden="true" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="architecture">
        <div className="case-section__label">
          <span>03</span>
          <h2 id="architecture">Architecture</h2>
        </div>
        <p className="section-intro">
          The system path at a glance. Each box names a boundary; each caption
          names the job it performs.
        </p>
        <ArchitectureRail steps={caseStudy.architecture} />
      </section>

      <section className="case-section" aria-labelledby="decisions">
        <div className="case-section__label">
          <span>04</span>
          <h2 id="decisions">Decisions + tradeoffs</h2>
        </div>
        <div className="decision-list">
          {caseStudy.decisions.map((decision, index) => (
            <article key={decision.title}>
              <span>D-{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{decision.title}</h3>
                <p>{decision.detail}</p>
              </div>
              <aside>
                <strong>Tradeoff</strong>
                <p>{decision.tradeoff}</p>
              </aside>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section" aria-labelledby="evidence">
        <div className="case-section__label">
          <span>05</span>
          <h2 id="evidence">Evidence ledger</h2>
        </div>
        <p className="section-intro">
          Claims are labeled by what a reader can inspect now. Withheld items
          include the measurement needed before publication.
        </p>
        <div className="evidence-ledger">
          {caseStudy.evidence.map((item) => {
            const status = statusDetails[item.status];
            const StatusIcon = status.icon;

            return (
              <article key={item.id} data-status={item.status}>
                <div className="evidence-ledger__id">{item.id}</div>
                <div className="evidence-ledger__finding">
                  <div>
                    <h3>{item.label}</h3>
                    <span className="evidence-status">
                      <StatusIcon aria-hidden="true" size={13} />
                      {status.label}
                    </span>
                  </div>
                  <p>{item.finding}</p>
                </div>
                <dl>
                  <div>
                    <dt>Method</dt>
                    <dd>{item.method}</dd>
                  </div>
                  <div>
                    <dt>Source / path</dt>
                    <dd>{item.source}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      <section className="case-section" aria-labelledby="limitations">
        <div className="case-section__label">
          <span>06</span>
          <h2 id="limitations">Not production-ready</h2>
        </div>
        <div className="limitations-grid">
          <div>
            <span>Current limits</span>
            <ul>
              {caseStudy.limitations.map((limitation) => (
                <li key={limitation}>{limitation}</li>
              ))}
            </ul>
          </div>
          <div>
            <span>Redesign for scale</span>
            <ul>
              {caseStudy.scaleRedesign.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <nav className="case-navigation" aria-label="Case study navigation">
        {adjacent.previous ? (
          <a href={`/${locale}/work/${adjacent.previous.slug}`}>
            <ArrowLeft aria-hidden="true" size={17} />
            <span>
              <small>Previous case</small>
              {adjacent.previous.shortTitle}
            </span>
          </a>
        ) : null}
        {adjacent.next ? (
          <a href={`/${locale}/work/${adjacent.next.slug}`}>
            <span>
              <small>Next case</small>
              {adjacent.next.shortTitle}
            </span>
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        ) : null}
      </nav>
    </article>
  );
}
