import snapshot from '@/data/analytics-snapshot.json';
import { routing } from '@/i18n/routing';

import { AnalyticsDashboard } from '@/components/analytics-dashboard/analytics-dashboard';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Market Observatory',
  description:
    'Explore verified job-posting data, normalized skill demand, and transparent processing results in an interactive analytics dashboard.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AnalyticsDashboard snapshot={snapshot} locale={locale} />;
}
