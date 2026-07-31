import { ArrowRight } from 'lucide-react';

import { ArchitectureRail } from './architecture-rail';
import { CaseLink } from './case-link';

import type { CaseStudy } from '@/data/case-studies';

interface CaseOverviewProps {
  caseStudy: CaseStudy;
  locale: string;
}

export function CaseOverview({ caseStudy, locale }: CaseOverviewProps) {
  return (
    <article className="case-overview">
      <div className="case-overview__heading">
        <span className="case-number">{caseStudy.number}</span>
        <div>
          <p className="eyebrow">{caseStudy.role}</p>
          <h3>{caseStudy.title}</h3>
        </div>
      </div>

      <div className="case-overview__body">
        <p className="case-outcome">{caseStudy.outcome}</p>

        <div className="case-overview__facts">
          <div>
            <span>My contribution</span>
            <p>{caseStudy.contributionSummary}</p>
          </div>
          <div>
            <span>Known limit</span>
            <p>{caseStudy.homepageLimitation}</p>
          </div>
        </div>

        <ArchitectureRail steps={caseStudy.architecture} compact />

        <div className="case-overview__actions">
          <a
            className="case-read-link"
            href={`/${locale}/work/${caseStudy.slug}`}>
            Read case <ArrowRight aria-hidden="true" size={16} />
          </a>
          <div
            className="case-proof-links"
            aria-label={`${caseStudy.title} proof links`}>
            {caseStudy.links.slice(0, 2).map((link) => (
              <CaseLink key={link.href} link={link} compact />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
