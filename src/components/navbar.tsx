'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function Navbar() {
  const locale = useLocale();

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <a
          className="site-mark"
          href={`/${locale}/`}
          aria-label="Daniel Berhane home">
          <span>Daniel Berhane</span>
          <small>Portfolio</small>
        </a>
        <div className="site-nav__links">
          <a href={`/${locale}/#work`}>Work</a>
          <a href={`/${locale}/#about`}>About</a>
          <a
            href="https://github.com/Daniel21b"
            target="_blank"
            rel="noreferrer noopener">
            GitHub <ArrowUpRight aria-hidden="true" size={12} />
          </a>
          <a href="mailto:dberhane@terpmail.umd.edu">Email</a>
        </div>
      </nav>
    </header>
  );
}
