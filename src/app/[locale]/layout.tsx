import '@/styles/global.css';

import { routing } from '@/i18n/routing';
import clsx from 'clsx';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

import env from '@/env.mjs';
import AnalyticsWrapper from '@/components/analytics';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

import type { Metadata, Viewport } from 'next/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL),
    title: {
      default: 'Daniel Berhane',
      template: '%s | Daniel Berhane',
    },
    authors: [{ name: 'Daniel Berhane' }],
    applicationName: 'Daniel Berhane',
    description:
      'Daniel Berhane’s portfolio of data engineering, backend, and software projects.',
    openGraph: {
      title: 'Daniel Berhane',
      description:
        'Daniel Berhane’s portfolio of data engineering, backend, and software projects.',
      url: env.NEXT_PUBLIC_WEBSITE_URL,
      siteName: 'Daniel Berhane',
      images: [
        {
          url: `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og`,
          width: 1920,
          height: 1080,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: 'Daniel Berhane',
      card: 'summary_large_image',
      description:
        'Daniel Berhane’s portfolio of data engineering, backend, and software projects.',
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og`],
    },
    manifest: '/static/site.webmanifest',
    verification: {
      google: '64Pb4e1oRhhlHgM6aJGvqSunCfPa38sJ5ZHPfLNtzts',
    },
    alternates: {
      canonical: env.NEXT_PUBLIC_WEBSITE_URL,
      types: {
        'application/rss+xml': `${env.NEXT_PUBLIC_WEBSITE_URL}/feed.xml`,
      },
    },
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  colorScheme: 'light',
  themeColor: '#f7f4ee',
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  const isVercelDeployment = process.env.VERCEL === '1';

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={clsx(GeistSans.variable, GeistMono.variable)}>
      <body>
        <NextIntlClientProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          {isVercelDeployment ? <AnalyticsWrapper /> : null}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
