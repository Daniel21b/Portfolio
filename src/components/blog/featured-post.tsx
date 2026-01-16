import { Link } from '@/i18n/navigation';
import { clsx } from 'clsx';
import { Eye } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

import ViewCounter from './views-counter';

interface FeaturedPostProps {
  title: string;
  slug: string;
  gradient: string;
}

export default function FeaturedPost({
  title,
  slug,
  gradient,
}: FeaturedPostProps) {
  return (
    <Link
      href={{
        pathname: '/blog/[slug]',
        params: { slug },
      }}
      className={clsx(
        'group transform transition-all duration-300 hover:scale-[1.02]',
        'w-full rounded-xl bg-linear-to-r p-[1px] md:w-1/3',
        gradient,
      )}>
      {/* Glassmorphism inner card */}
      <div className="flex h-full flex-col justify-between rounded-[11px] bg-white/80 p-4 backdrop-blur-xl transition-colors duration-300 dark:bg-zinc-900/80">
        <div className="flex flex-col justify-between md:flex-row">
          <h4 className="mb-6 w-full text-lg font-medium tracking-tight text-zinc-800 dark:text-zinc-100 sm:mb-10 md:text-lg">
            <Balancer>{title}</Balancer>
          </h4>
        </div>
        <div className="capsize flex items-center text-zinc-600 transition-colors group-hover:text-zinc-800 dark:text-zinc-400 dark:group-hover:text-zinc-200">
          <Eye strokeWidth={1.5} className="h-5 w-5" />
          <span className="capsize ml-2 align-baseline text-sm">
            <ViewCounter slug={slug} trackView={false} />
          </span>
        </div>
      </div>
    </Link>
  );
}
