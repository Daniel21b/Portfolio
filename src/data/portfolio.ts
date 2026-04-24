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
    'Architected an event-driven pipeline with AWS Textract to parse PDF invoices into a normalized PostgreSQL schema, cutting end-to-end processing time by 95%.',
    'Migrated orchestration from AWS Lambda to Apache Airflow and integrated a Streamlit interface for human-in-the-loop validation before database commits.',
    'Built transformation layers in Python and PySpark to standardize extracted invoice fields for analytics-ready downstream reporting.',
  ],
  technologies: [
    'Python',
    'PySpark',
    'PostgreSQL',
    'Streamlit',
    'AWS Textract',
    'Airflow',
  ],
  github: 'https://github.com/Daniel21b/invoice_pipeline',
  featured: true,
};

export const projects: Project[] = [
  {
    title: 'AI Invoice Processing Pipeline',
    description:
      'Architected an event-driven pipeline using AWS Textract to parse PDF invoices into a normalized PostgreSQL schema, reducing processing time by 95%. Migrated orchestration from AWS Lambda to Airflow and added a Streamlit HITL validation layer before commits.',
    technologies: [
      'Python',
      'PySpark',
      'PostgreSQL',
      'Streamlit',
      'AWS Textract',
      'Airflow',
    ],
    period: '2025',
    github: 'https://github.com/Daniel21b/invoice_pipeline',
  },
  {
    title: 'PreClear AI - Permit Compliance Platform',
    description:
      'Built Python and Apify scrapers to extract and normalize permit compliance requirements across 50+ municipalities. Developed a FastAPI backend for compliance cross-referencing with CI/CD automation via GitHub Actions.',
    technologies: [
      'Python',
      'PostgreSQL',
      'FastAPI',
      'JavaScript',
      'Apify',
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
      'Built permit compliance data scrapers and a FastAPI backend to cross-reference project descriptions against municipal requirements.',
    url: 'https://github.com/Daniel21b',
    liveDemo: 'https://www.preclearai.net/',
    technologies: ['Python', 'PostgreSQL', 'FastAPI', 'Apify'],
  },
];

// Homepage featured project (simplified for homepage display)
export const homepageFeaturedProject = {
  title: 'AI Invoice Processing Pipeline',
  description: [
    'Event-driven invoice ingestion with AWS Textract reduced end-to-end processing time by 95%.',
    'Added Airflow orchestration and Streamlit human-in-the-loop validation before database commits.',
  ],
  technologies: [
    'Python',
    'PySpark',
    'PostgreSQL',
    'Streamlit',
    'AWS Textract',
    'Airflow',
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
      'PreClear AI is a permit compliance platform that automates how teams research and validate municipal requirements before project kickoff. It consolidates fragmented jurisdiction rules into a searchable workflow so builders can reduce compliance risk and speed up planning.',
    website: 'https://www.preclearai.net/',
    founded: '2025',
    role: 'Builder & Data/Backend Engineer',
    status: 'Active',
    industry: 'GovTech / Compliance Automation',
    highlights: [
      'Built Python and Apify scraping pipelines to extract and normalize permit requirements across 50+ municipalities.',
      'Developed a FastAPI backend to cross-reference project descriptions against regulatory datasets and return compliance checks.',
      'Implemented CI/CD automation with GitHub Actions to improve deployment reliability and release velocity.',
      'Designed PostgreSQL data models to support structured querying across heterogeneous rule sets and frequent updates.',
    ],
    technologies: ['Python', 'PostgreSQL', 'FastAPI', 'JavaScript', 'Apify', 'GitHub Actions'],
    color: 'from-indigo-500 to-cyan-500',
  },
];
