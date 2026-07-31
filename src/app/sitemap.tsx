import { selectedCaseStudies } from '@/data/case-studies';

import env from '@/env.mjs';

export default function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/projects',
    '/certifications',
    '/startups',
  ];
  const caseRoutes = selectedCaseStudies.map(
    (caseStudy) => `/work/${caseStudy.slug}`,
  );

  return [...staticRoutes, ...caseRoutes].map((route) => ({
    url: `${env.NEXT_PUBLIC_WEBSITE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));
}
