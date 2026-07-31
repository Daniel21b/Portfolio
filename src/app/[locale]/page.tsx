import { otherWork, selectedCaseStudies } from '@/data/case-studies';
import { routing } from '@/i18n/routing';
import { ArrowRight, Github, Mail } from 'lucide-react';

import { CaseOverview } from '@/components/portfolio/case-overview';
import { SectionHeading } from '@/components/portfolio/section-heading';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data and backend engineering',
  description:
    'Daniel Berhane’s portfolio of data engineering, backend, and software projects.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const workingPrinciples = [
  {
    index: '01',
    title: 'Understand the path',
    detail:
      'I like being able to follow a result back through the code, transformations, and source that produced it.',
  },
  {
    index: '02',
    title: 'Leave room for review',
    detail:
      'When an automated result is uncertain, I would rather make that visible and give someone a clear way to review it.',
  },
  {
    index: '03',
    title: 'Measure before claiming',
    detail:
      'I try to keep metrics tied to a clear baseline, method, and sample instead of treating them as decoration.',
  },
  {
    index: '04',
    title: 'Write down the tradeoffs',
    detail:
      'Constraints and unfinished parts are useful context, so I include them alongside the decisions that shaped the work.',
  },
] as const;

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="hero__kicker">Daniel Berhane · Portfolio</p>
          <h1 id="hero-title">
            Hi, I&apos;m Daniel. I work in data and backend engineering.
          </h1>
          <p className="hero__intro">
            I&apos;m a computer science graduate who enjoys building useful data
            tools, backend services, and clear interfaces. Here are a few
            projects I&apos;ve worked on.
          </p>
          <div className="hero__actions">
            <a className="button button--signal" href="#work">
              View my work
              <ArrowRight aria-hidden="true" size={17} />
            </a>
            <a
              className="button button--text"
              href="mailto:dberhane@terpmail.umd.edu">
              Email me
              <Mail aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="home-section" id="work" aria-labelledby="work-title">
        <SectionHeading
          id="work-title"
          index="01"
          title="Selected work"
          description="A few projects I've worked on, with notes on what I built and learned."
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
        aria-labelledby="approach-title">
        <SectionHeading
          id="approach-title"
          index="02"
          title="How I work"
          description="A few habits that guide how I build and explain technical work."
        />
        <div className="principles-grid">
          {workingPrinciples.map((principle) => (
            <article key={principle.index}>
              <span>{principle.index}</span>
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </article>
          ))}
        </div>
        <p className="about-note">
          I earned a B.S. in Computer Science in August 2025. I&apos;m
          interested in data engineering, analytics engineering, and backend
          roles where I can keep learning and contribute to useful systems.
        </p>
      </section>

      <section className="home-section" aria-labelledby="other-work-title">
        <SectionHeading
          id="other-work-title"
          index="03"
          title="Other work"
          description="A little more of the work I've contributed to."
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
        <p className="eyebrow">Get in touch</p>
        <h2 id="contact-title">Thanks for stopping by.</h2>
        <p className="contact-block__intro">
          If you&apos;d like to talk about a role, a project, or the work here,
          feel free to reach out.
        </p>
        <div>
          <a
            className="button button--signal"
            href="mailto:dberhane@terpmail.umd.edu">
            Email me
            <Mail aria-hidden="true" size={17} />
          </a>
          <a
            className="button button--text"
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
