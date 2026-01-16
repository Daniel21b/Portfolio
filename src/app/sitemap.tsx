import env from '@/env.mjs';

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/projects',
    '/certifications',
    '/startups',
    '/guestbook',
  ].map((route) => ({
    url: `${env.NEXT_PUBLIC_WEBSITE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return routes;
}
