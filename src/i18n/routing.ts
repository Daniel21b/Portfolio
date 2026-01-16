import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/certifications': '/certifications',
    '/dashboard': '/dashboard',
    '/projects': '/projects',
    '/startups': '/startups',
  },
});
