'use client';

import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale();

  return (
    <footer className="site-footer">
      <div>
        <a className="site-mark site-mark--footer" href={`/${locale}/`}>
          <span>DB—01</span>
          <small>Daniel Berhane</small>
        </a>
        <p>
          Data pipelines, analytics workflows, and compliance systems with the
          evidence attached.
        </p>
      </div>
      <div className="site-footer__links">
        <a href={`/${locale}/projects`}>Selected work</a>
        <a
          href="https://github.com/Daniel21b"
          target="_blank"
          rel="noreferrer noopener">
          GitHub ↗
        </a>
        <a href="mailto:dberhane@terpmail.umd.edu">Email</a>
      </div>
      <p className="site-footer__meta">
        © {new Date().getFullYear()} Daniel Berhane
        <span>Built with Next.js</span>
      </p>
    </footer>
  );
}
