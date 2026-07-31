import { ArrowUpRight, Github, MonitorPlay } from 'lucide-react';

import type { CaseLink as CaseLinkType } from '@/data/case-studies';

interface CaseLinkProps {
  link: CaseLinkType;
  compact?: boolean;
}

export function CaseLink({ link, compact = false }: CaseLinkProps) {
  const Icon =
    link.kind === 'source'
      ? Github
      : link.kind === 'demo'
        ? MonitorPlay
        : ArrowUpRight;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className={compact ? 'proof-link proof-link--compact' : 'proof-link'}>
      <Icon aria-hidden="true" size={16} strokeWidth={1.75} />
      <span>{link.label}</span>
      {link.note ? (
        <span className="proof-link__note">({link.note})</span>
      ) : null}
    </a>
  );
}
