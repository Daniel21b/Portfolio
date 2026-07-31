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
    period: '2025–2026',
    organization: 'ICATT Consulting',
    role: 'Applied Data Analytics',
    detail:
      'Revenue reporting data models, reconciliation workflows, and business intelligence delivery.',
  },
  {
    period: '2024',
    organization: 'Boost Labs',
    role: 'Data and reporting work',
    detail:
      'Recurring Python and SQL reporting pipelines with Tableau KPI workflows.',
  },
] as const;

export default function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-page__header">
        <p className="eyebrow">Profile / Working method</p>
        <h1>I build data systems that can explain themselves.</h1>
        <p>
          I’m Daniel Berhane. I earned a B.S. in Computer Science in August 2025
          and work across data engineering, analytics engineering, and backend
          systems. I care about the point where a pipeline’s technical shape
          becomes an operational decision: what gets measured, where a person
          reviews uncertainty, and how a result can be traced.
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
              <h3>{item.organization}</h3>
              <strong>{item.role}</strong>
              <p>{item.detail}</p>
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
