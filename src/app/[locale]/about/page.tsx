import { routing } from '@/i18n/routing';
import { Github, Linkedin, Mail } from 'lucide-react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Daniel Berhane, a data and backend engineer focused on traceable systems.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const experience = [
  {
    period: 'Aug 2025–Jul 2026',
    organization: 'ICATT Consulting',
    href: 'https://www.icattconsulting.com',
    location: 'Remote',
    role: 'Software Developer',
    details: [
      'Architected automated data integration services in Python and SQL, consolidating three decoupled financial systems into a unified storage layer and cutting end-to-end processing latency from multiple days to under three hours.',
      'Engineered normalized relational database schemas with indexed transaction-grain tables, establishing a reusable data access layer that eliminated redundant one-off extraction code for new reporting requirements.',
      'Implemented automated validation and integration test suites as CI/CD release gates—including uniqueness, not-null, and referential-integrity checks—catching more than 20 logic and data-integrity defects before production deployment.',
      'Developed an automated background reconciliation service with real-time mismatch alerting between source systems and the storage layer, eliminating eight hours per week of manual operational checks.',
    ],
  },
  {
    period: 'Jan–Jun 2025',
    organization: 'Cube Money',
    href: 'https://www.cubemoney.io',
    location: 'College Park, MD',
    role: 'Software Engineer',
    details: [
      'Developed a multi-attribute identity-resolution algorithm in Python, matching on phone and group membership to deduplicate user records across eight backend systems and restore transactional accuracy for more than 3,000 accounts.',
      'Abstracted core business logic into unified data models, consolidating 15 redundant query implementations into a single source of truth and cutting analysis turnaround from two days to under one hour.',
      'Built automated consistency checkers that audited live transactional records across 120 distributed account groups, proactively flagging missing, late, and inconsistent state before it reached downstream decisions.',
    ],
  },
] as const;

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-page__header">
        <p className="eyebrow">Profile / Working method</p>
        <h1>I build data systems that can explain themselves.</h1>
        <p>
          I’m Daniel Berhane. I earned a B.S. in Computer Science in May 2025
          and work across software, backend, and distributed data systems. I
          care about the point where a system’s technical shape becomes an
          operational decision: what gets measured, where a person reviews
          uncertainty, and how a result can be traced.
        </p>
      </header>

      <section className="about-page__split" aria-labelledby="about-method">
        <h2 id="about-method">How I work</h2>
        <div>
          <p>
            I start with the evidence surface: raw inputs, transformation
            boundaries, failure paths, and the artifact another engineer can
            inspect. From there I choose the smallest architecture that keeps
            the workflow legible.
          </p>
          <p>
            This portfolio uses the same standard. Unverified metrics are
            withheld, team ownership is separated from my contribution, and
            limitations are included with the design.
          </p>
        </div>
      </section>

      <section className="about-page__experience" aria-labelledby="experience">
        <h2 id="experience">Selected experience</h2>
        <div>
          {experience.map((item) => (
            <article key={item.organization}>
              <span>{item.period}</span>
              <h3>
                <a href={item.href} target="_blank" rel="noreferrer noopener">
                  {item.organization}
                </a>
                <small>{item.location}</small>
              </h3>
              <strong>{item.role}</strong>
              <ul>
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="about-page__links" aria-labelledby="about-contact">
        <h2 id="about-contact">Contact</h2>
        <div>
          <a href="mailto:dberhane@terpmail.umd.edu">
            <Mail aria-hidden="true" size={17} /> Email
          </a>
          <a
            href="https://github.com/Daniel21b"
            target="_blank"
            rel="noreferrer noopener">
            <Github aria-hidden="true" size={17} /> GitHub
          </a>
          <a
            href="https://linkedin.com/in/daniel-berhane"
            target="_blank"
            rel="noreferrer noopener">
            <Linkedin aria-hidden="true" size={17} /> LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
