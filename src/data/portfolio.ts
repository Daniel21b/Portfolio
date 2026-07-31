/**
 * Centralized Portfolio Data
 *
 * This file contains all the portfolio data for Projects, Certifications, and Startups.
 * Import from this file to maintain consistency across the site.
 */

// ============================================================================
// PROJECT TYPES & DATA
// ============================================================================

export interface Project {
  title: string;
  description: string | string[];
  technologies: string[];
  github: string;
  liveDemo?: string;
  featured?: boolean;
  period?: string;
}

export const featuredProject: Project = {
  title: 'AI Invoice Processing Pipeline',
  description: [
    'Built three authenticated invoice intake paths that converge on a normalized PostgreSQL schema for traceable review.',
    'Connected encrypted S3 uploads to Lambda through ObjectCreated notifications and parsed synchronous Textract LINE blocks into invoice fields.',
    'Built Streamlit analytics, record details, audit views, lifecycle actions, and CSV export over the shared data model.',
  ],
  technologies: [
    'Python',
    'PostgreSQL',
    'Streamlit',
    'AWS Textract',
    'AWS Lambda',
    'AWS CDK',
  ],
  github: 'https://github.com/Daniel21b/invoice_pipeline',
  featured: true,
};

export const projects: Project[] = [
  {
    title: 'AI Invoice Processing Pipeline',
    description:
      'Built document, spreadsheet, and manual invoice intake paths that normalize classified records into PostgreSQL for analytics, search, audit, and export.',
    technologies: [
      'Python',
      'PostgreSQL',
      'Streamlit',
      'AWS Textract',
      'AWS Lambda',
      'AWS CDK',
    ],
    period: '2025',
    github: 'https://github.com/Daniel21b/invoice_pipeline',
  },
  {
    title: 'PreClear AI - Permit Compliance Platform',
    description:
      'Built a Python ingestion path over a 354-record, 39-source, 21-county repository snapshot, then implemented a Next.js/TypeScript permit service that evaluates explicit rules before jurisdiction-scoped hybrid retrieval.',
    technologies: [
      'Python',
      'TypeScript',
      'Next.js',
      'PostgreSQL',
      'Supabase',
      'pgvector',
      'OpenAI',
      'Zod',
      'GitHub Actions',
    ],
    period: '2025',
    github: 'https://github.com/Daniel21b',
    liveDemo: 'https://www.preclearai.net/',
  },
  {
    title: 'Tech Job Market Trends Dashboard',
    description:
      'Scraped and cleaned thousands of job postings using BeautifulSoup and Pandas to track in-demand skills and hiring patterns. Visualized month-over-month hiring trends with Matplotlib in an interactive Streamlit dashboard.',
    technologies: [
      'Python',
      'Pandas',
      'BeautifulSoup',
      'Matplotlib',
      'Docker',
      'Streamlit',
    ],
    period: '2024',
    github: 'https://github.com/Daniel21b/Job-Market-Analytics',
    liveDemo: 'https://job-market-analytics-fx.streamlit.app/',
  },
];

// Homepage secondary projects (simplified version)
export const homepageSecondaryProjects = [
  {
    name: 'Tech Job Market Trends',
    description:
      'Scraped and cleaned thousands of job postings to track in-demand skills and visualize hiring trends in Streamlit.',
    url: 'https://github.com/Daniel21b/Job-Market-Analytics',
    liveDemo: 'https://job-market-analytics-fx.streamlit.app/',
    technologies: ['Python', 'Pandas', 'BeautifulSoup', 'Matplotlib'],
  },
  {
    name: 'PreClear AI',
    description:
      'Built scheduled Python ordinance ingestion and a Next.js/TypeScript two-track permit decision path with an explicit VERIFY_WITH_COUNTY fallback.',
    url: 'https://github.com/Daniel21b',
    liveDemo: 'https://www.preclearai.net/',
    technologies: [
      'Python',
      'TypeScript',
      'Next.js',
      'Supabase',
      'pgvector',
      'OpenAI',
    ],
  },
];

// Homepage featured project (simplified for homepage display)
export const homepageFeaturedProject = {
  title: 'AI Invoice Processing Pipeline',
  description: [
    'Document, spreadsheet, and manual invoice intake converge on one classified PostgreSQL record model.',
    'S3 events invoke Lambda directly for synchronous Textract extraction; Streamlit provides analytics, record review, audit, and export.',
  ],
  technologies: [
    'Python',
    'PostgreSQL',
    'Streamlit',
    'AWS Textract',
    'AWS Lambda',
    'AWS CDK',
  ],
  github: 'https://github.com/Daniel21b/invoice_pipeline',
};

// ============================================================================
// CERTIFICATION TYPES & DATA
// ============================================================================

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string | null;
  credentialUrl: string | null;
  description: string;
  skills: string[];
  color: string;
  comingSoon?: boolean;
}

export const certifications: Certification[] = [
  {
    name: 'IBM Accelerate Consulting Certification',
    issuer: 'IBM',
    date: 'November 2024',
    credentialId: 'c92e8117-05a0-4063-be5e-f67be8cb36e9',
    credentialUrl:
      'https://www.credly.com/badges/c92e8117-05a0-4063-be5e-f67be8cb36e9',
    description:
      'Completed IBM Accelerate Consulting program, demonstrating expertise in business consulting, technology solutions, and strategic problem-solving.',
    skills: [
      'Consulting',
      'Business Strategy',
      'Technology Solutions',
      'Problem Solving',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Data Scientist in Python',
    issuer: 'Dataquest',
    date: '2024',
    credentialId: 'DBLZAYJ1P5UOS5MSXM9I',
    credentialUrl: 'https://app.dataquest.io/view_cert/DBLZAYJ1P5UOS5MSXM9I',
    description:
      'Completed comprehensive data science path covering Python programming, data analysis, machine learning, statistics, and data visualization.',
    skills: [
      'Python',
      'Pandas',
      'Machine Learning',
      'Statistics',
      'Data Visualization',
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Coming Soon',
    credentialId: null,
    credentialUrl: null,
    description:
      'Currently preparing for this certification to demonstrate expertise in designing distributed systems on AWS.',
    skills: ['AWS', 'Cloud Architecture', 'System Design', 'Infrastructure'],
    color: 'from-orange-500 to-orange-600',
    comingSoon: true,
  },
];

// ============================================================================
// STARTUP TYPES & DATA
// ============================================================================

export interface Startup {
  name: string;
  tagline: string;
  description: string;
  website?: string;
  founded: string;
  role: string;
  status: 'Active' | 'Acquired' | 'Stealth' | 'Building';
  industry: string;
  teamSize?: string;
  highlights: string[];
  technologies: string[];
  color: string;
}

// Startup entries - Add your startups here when ready
export const startups: Startup[] = [
  {
    name: 'PreClear AI',
    tagline: 'Permit Compliance Intelligence Platform',
    description:
      'PreClear AI separates scheduled ordinance preparation from request-time permit resolution. Python filters, normalizes, deduplicates, embeds, and upserts source chunks; a Next.js/TypeScript service checks deterministic rules before a guarded hybrid-search fallback.',
    website: 'https://www.preclearai.net/',
    founded: '2025',
    role: 'Builder & Data/Backend Engineer',
    status: 'Active',
    industry: 'GovTech / Compliance Automation',
    highlights: [
      'Built Python filtering, county normalization, content-hash deduplication, batched embeddings, retry, and PostgreSQL upserts over a checked-in 354-record source snapshot.',
      'Developed a Next.js/TypeScript permit-check route with Zod validation, Supabase authentication, entitlement checks, and deterministic rule evaluation.',
      'Implemented jurisdiction-scoped PostgreSQL full-text plus pgvector retrieval with an explicit VERIFY_WITH_COUNTY uncertainty result.',
      'Configured weekly GitHub Actions ingestion; current workflow reliability and live-release parity are disclosed as unresolved.',
    ],
    technologies: [
      'Python',
      'TypeScript',
      'Next.js',
      'PostgreSQL',
      'Supabase',
      'pgvector',
      'OpenAI',
      'Zod',
      'GitHub Actions',
    ],
    color: 'from-indigo-500 to-cyan-500',
  },
];
