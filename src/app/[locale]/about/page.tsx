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
    period: 'Aug 2025–Mar 2026',
    organization: 'ICATT Consulting',
    href: 'https://www.icattconsulting.com',
    location: 'Remote',
    role: 'Software Developer (Contract)',
    details: [
      'Wrote Django APIs, views, and templates for a multi-vendor ecommerce store, including a vendor onboarding portal. Integrated Stripe and PayPal, with logging and tracking for signup and payments.',
      'Worked on a Django + FastAPI accounting app deployed with Docker on AWS ECS. Django covered client portals, the ledger, and practice management; FastAPI handled third-party aggregation and reporting.',
      'Wrote FastAPI endpoints aggregating three third-party financial systems, reducing manual pulls and reconciliation from days to minutes.',
      'Wrote an Amazon EventBridge-scheduled reconciliation job comparing source systems to the ledger, saving about eight hours of manual checks per week.',
      'Wrote pytest unit and integration tests in GitHub Actions. Error rates in app logs dropped by over 50%, with remaining failures flagged as tickets.',
    ],
  },
  {
    period: 'Jan–Jun 2025',
    organization: 'Cube Money (UMD StartHub)',
    href: 'https://www.cubemoney.io',
    location: 'College Park, MD',
    role: 'Software Engineer',
    details: [
      'Wrote Flask APIs for a startup digitizing Ethiopian Ekub rotating savings, using SQLAlchemy and PostgreSQL for groups, members, contributions, payouts, late payments, and one seat per phone number.',
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
          <a href="mailto:d.asfaw10@gmail.com">
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
