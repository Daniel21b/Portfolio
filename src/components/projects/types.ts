export interface Project {
  title: string;
  description: string | string[];
  technologies: string[];
  github: string;
  liveDemo?: string;
  featured?: boolean;
  period?: string;
}

// Tech badge color mapping for consistent styling
export const techColors: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  Python: { bg: 'bg-blue-100', text: 'text-blue-700', darkBg: 'dark:bg-blue-900/40', darkText: 'dark:text-blue-300' },
  PostgreSQL: { bg: 'bg-sky-100', text: 'text-sky-700', darkBg: 'dark:bg-sky-900/40', darkText: 'dark:text-sky-300' },
  Streamlit: { bg: 'bg-red-100', text: 'text-red-700', darkBg: 'dark:bg-red-900/40', darkText: 'dark:text-red-300' },
  'AWS Lambda': { bg: 'bg-orange-100', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/40', darkText: 'dark:text-orange-300' },
  'AWS S3': { bg: 'bg-orange-100', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/40', darkText: 'dark:text-orange-300' },
  'AWS RDS': { bg: 'bg-orange-100', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/40', darkText: 'dark:text-orange-300' },
  'AWS Textract': { bg: 'bg-orange-100', text: 'text-orange-700', darkBg: 'dark:bg-orange-900/40', darkText: 'dark:text-orange-300' },
  Pandas: { bg: 'bg-indigo-100', text: 'text-indigo-700', darkBg: 'dark:bg-indigo-900/40', darkText: 'dark:text-indigo-300' },
  BeautifulSoup: { bg: 'bg-green-100', text: 'text-green-700', darkBg: 'dark:bg-green-900/40', darkText: 'dark:text-green-300' },
  Matplotlib: { bg: 'bg-teal-100', text: 'text-teal-700', darkBg: 'dark:bg-teal-900/40', darkText: 'dark:text-teal-300' },
  NumPy: { bg: 'bg-cyan-100', text: 'text-cyan-700', darkBg: 'dark:bg-cyan-900/40', darkText: 'dark:text-cyan-300' },
  Seaborn: { bg: 'bg-purple-100', text: 'text-purple-700', darkBg: 'dark:bg-purple-900/40', darkText: 'dark:text-purple-300' },
  Plotly: { bg: 'bg-violet-100', text: 'text-violet-700', darkBg: 'dark:bg-violet-900/40', darkText: 'dark:text-violet-300' },
  Looker: { bg: 'bg-emerald-100', text: 'text-emerald-700', darkBg: 'dark:bg-emerald-900/40', darkText: 'dark:text-emerald-300' },
  Crawl4AI: { bg: 'bg-lime-100', text: 'text-lime-700', darkBg: 'dark:bg-lime-900/40', darkText: 'dark:text-lime-300' },
  FastAPI: { bg: 'bg-teal-100', text: 'text-teal-700', darkBg: 'dark:bg-teal-900/40', darkText: 'dark:text-teal-300' },
  JWT: { bg: 'bg-pink-100', text: 'text-pink-700', darkBg: 'dark:bg-pink-900/40', darkText: 'dark:text-pink-300' },
  AsyncIO: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-700', darkBg: 'dark:bg-fuchsia-900/40', darkText: 'dark:text-fuchsia-300' },
};

export const getTechColor = (tech: string) => {
  return techColors[tech] ?? {
    bg: 'bg-zinc-100',
    text: 'text-zinc-700',
    darkBg: 'dark:bg-zinc-800',
    darkText: 'dark:text-zinc-300',
  };
};

