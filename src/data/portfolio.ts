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
  title: 'Automated Invoice Processing Platform',
  description: [
    'Built a serverless event-driven pipeline with Step Functions orchestrating asynchronous Textract extraction across Lambda functions and persisting normalized fields to PostgreSQL.',
    'Defined the complete AWS architecture as Infrastructure as Code with AWS CDK.',
    'Integrated a Streamlit human-in-the-loop review interface so low-confidence fields are validated before database persistence.',
  ],
  technologies: [
    'Python',
    'PostgreSQL',
    'Streamlit',
    'AWS Textract',
    'AWS Lambda',
    'AWS Step Functions',
    'AWS CDK',
  ],
  github: 'https://github.com/Daniel21b/invoice_pipeline',
  featured: true,
};

export const projects: Project[] = [
  {
    title: 'Automated Invoice Processing Platform',
    description:
      'Built a serverless event-driven AWS pipeline that orchestrates asynchronous invoice extraction, persists normalized fields to PostgreSQL, and routes low-confidence results through human review.',
    technologies: [
      'Python',
      'PostgreSQL',
      'Streamlit',
      'AWS Textract',
      'AWS Lambda',
      'AWS Step Functions',
      'AWS CDK',
    ],
    period: '2025',
    github: 'https://github.com/Daniel21b/invoice_pipeline',
  },
  {
    title: 'PreClear AI - Permit Compliance Platform',
    description:
      'Built modular Apify and Python ingestion services that normalize requirements from more than 50 municipal sites, plus FastAPI services that map project attributes to jurisdiction-specific permit and compliance rules.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'JavaScript', 'Apify'],
    period: '2025',
    github: 'https://github.com/Daniel21b',
    liveDemo: 'https://www.preclearai.net/',
  },
  {
    title: 'Distributed Skill Analytics Engine & REST API',
    description:
      'Validated an asynchronous Python and PySpark service on 4,137 fixture rows, producing 4,135 canonical postings and 2,164 skill matches across 65 skills; 100 populated warm-cache requests measured 1.989ms p95 locally.',
    technologies: [
      'Python',
      'PySpark',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Docker',
      'AWS',
    ],
    period: '2025',
    github: 'https://github.com/Daniel21b/Job-Market-Analytics',
  },
];

// Homepage secondary projects (simplified version)
export const homepageSecondaryProjects = [
  {
    name: 'Distributed Skill Analytics Engine & REST API',
    description:
      'Reconciled 4,137 fixture rows into 4,135 canonical postings with PySpark, matched 65 skills, and served populated warm-cache FastAPI filters at 1.989ms p95 over 100 local requests.',
    url: 'https://github.com/Daniel21b/Job-Market-Analytics',
    technologies: [
      'Python',
      'PySpark',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
  },
  {
    name: 'PreClear AI',
    description:
      'Normalized compliance requirements from 50+ municipal sites with Apify and Python, then mapped project attributes to jurisdiction-specific rules through FastAPI.',
    url: 'https://github.com/Daniel21b',
    liveDemo: 'https://www.preclearai.net/',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'JavaScript', 'Apify'],
  },
];

// Homepage featured project (simplified for homepage display)
export const homepageFeaturedProject = {
  title: 'Automated Invoice Processing Platform',
  description: [
    'Step Functions orchestrates asynchronous Textract extraction across Lambda functions and persists normalized invoice fields to PostgreSQL.',
    'Streamlit routes low-confidence extractions through human review before database persistence.',
  ],
  technologies: [
    'Python',
    'PostgreSQL',
    'Streamlit',
    'AWS Textract',
    'AWS Lambda',
    'AWS Step Functions',
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
    tagline: 'Permit Compliance Platform',
    description:
      'PreClear AI uses modular Apify and Python ingestion services to normalize municipal compliance requirements into PostgreSQL, while FastAPI maps project attributes to jurisdiction-specific permit rules through a single low-latency lookup.',
    website: 'https://www.preclearai.net/',
    founded: '2025',
    role: 'Builder & Backend Engineer',
    status: 'Active',
    industry: 'GovTech / Compliance Automation',
    highlights: [
      'Developed modular scraping and ingestion services in Apify and Python.',
      'Normalized compliance requirements from more than 50 structurally different municipal sites into a unified PostgreSQL schema.',
      'Engineered FastAPI services that map project attributes to jurisdiction-specific permit and compliance rules.',
      'Turned manual municipal research into a low-latency single-point lookup.',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'JavaScript', 'Apify'],
    color: 'from-indigo-500 to-cyan-500',
  },
];
