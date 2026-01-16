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
  title: 'Automated Invoice Processing Pipeline',
  description: [
    'Designed an event-driven architecture that eliminates manual data entry by automatically triggering extraction pipelines upon file upload, reducing processing time by 95%.',
    'Migrated real-time invoice processing to a scheduled Airflow batch architecture, optimizing compute resource usage by processing uploads in hourly micro-batches.',
    'Implemented unstructured-to-structured data transformation using AI-based OCR to parse PDF invoices and normalize them into a relational PostgreSQL schema.',
  ],
  technologies: ['Python', 'PostgreSQL', 'Streamlit', 'AWS Lambda', 'AWS S3', 'AWS RDS', 'AWS Textract'],
  github: 'https://github.com/Daniel21b/invoice_pipeline',
  featured: true,
};

export const projects: Project[] = [
  {
    title: 'Tech Job Market Trends Dashboard',
    description:
      'Scraped job postings from career sites using BeautifulSoup to track company hiring patterns. Standardized company names with Pandas and analyzed month-over-month position changes with NumPy. Visualized hiring trends using Matplotlib.',
    technologies: ['Python', 'Pandas', 'BeautifulSoup', 'Matplotlib', 'NumPy'],
    period: 'Jan 2024 - Mar 2024',
    github: 'https://github.com/Daniel21b/Job-Market-Analytics',
    liveDemo: 'https://job-market-analytics-fx.streamlit.app/',
  },
  {
    title: 'DC Bikeshare Demand & Peak Usage Analysis',
    description:
      'Processed 2+ million Bikeshare trips using Pandas to identify usage patterns across DC metro stations. Calculated statistical correlations between weather and ridership. Generated Seaborn heatmaps and Plotly interactive visualizations.',
    technologies: ['Python', 'Pandas', 'Seaborn', 'Plotly', 'Looker'],
    period: 'Aug 2024 - Oct 2024',
    github: 'https://github.com/Daniel21b/DC-Bikeshare-Demand-Analysis',
    liveDemo: 'https://dc-bikeshare-demand-analysis-ycklasmcgsozwy87bsdgzr.streamlit.app/',
  },
  {
    title: 'Open Source Contribution - Crawl4AI',
    description:
      'Built async scraping pipelines with Crawl4AI handling 500+ pages, implementing session management. Enhanced FastAPI endpoints with JWT authentication, reducing unauthorized access attempts by 95%.',
    technologies: ['Python', 'Crawl4AI', 'FastAPI', 'JWT', 'AsyncIO'],
    period: 'Mar 2025 - May 2025',
    github: 'https://github.com/unclecode/crawl4ai/pull/1630',
  },
];

// Homepage secondary projects (simplified version)
export const homepageSecondaryProjects = [
  {
    name: 'Tech Job Market Trends',
    description:
      'Scraped job postings to track hiring patterns and visualize trends using Python, Pandas, and Matplotlib.',
    url: 'https://github.com/Daniel21b/Job-Market-Analytics',
    liveDemo: 'https://job-market-analytics-fx.streamlit.app/',
    technologies: ['Python', 'Pandas', 'Matplotlib'],
  },
  {
    name: 'DC Bikeshare Analysis',
    description:
      'Processed 2M+ trips to identify peak usage patterns. Discovered 8 stations account for 60% of rush-hour demand.',
    url: 'https://github.com/Daniel21b/DC-Bikeshare-Demand-Analysis',
    liveDemo: 'https://dc-bikeshare-demand-analysis-ycklasmcgsozwy87bsdgzr.streamlit.app/',
    technologies: ['Python', 'Pandas', 'Plotly'],
  },
];

// Homepage featured project (simplified for homepage display)
export const homepageFeaturedProject = {
  title: 'Automated Invoice Processing Pipeline',
  description: [
    'Event-driven architecture eliminating manual data entry, reducing processing time by 95%.',
    'AI-based OCR parsing PDF invoices into structured PostgreSQL schema.',
  ],
  technologies: ['Python', 'PostgreSQL', 'Streamlit', 'AWS Lambda', 'AWS S3', 'AWS Textract'],
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
    credentialUrl: 'https://www.credly.com/badges/c92e8117-05a0-4063-be5e-f67be8cb36e9',
    description: 'Completed IBM Accelerate Consulting program, demonstrating expertise in business consulting, technology solutions, and strategic problem-solving.',
    skills: ['Consulting', 'Business Strategy', 'Technology Solutions', 'Problem Solving'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Data Scientist in Python',
    issuer: 'Dataquest',
    date: '2024',
    credentialId: 'DBLZAYJ1P5UOS5MSXM9I',
    credentialUrl: 'https://app.dataquest.io/view_cert/DBLZAYJ1P5UOS5MSXM9I',
    description: 'Completed comprehensive data science path covering Python programming, data analysis, machine learning, statistics, and data visualization.',
    skills: ['Python', 'Pandas', 'Machine Learning', 'Statistics', 'Data Visualization'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Coming Soon',
    credentialId: null,
    credentialUrl: null,
    description: 'Currently preparing for this certification to demonstrate expertise in designing distributed systems on AWS.',
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
export const startups: Startup[] = [];

