export type AnalyticsSnapshot = {
  schemaVersion: number;
  generatedAt: string;
  benchmarkDate: string;
  source: {
    name: string;
    url: string;
    revision: string;
    asOf: string;
    country: string;
    sampling: string;
    statusCoverage?: string;
  };
  metrics: {
    inputRows: number;
    canonicalRows: number;
    duplicateRows: number;
    skillMatchRows: number;
    matchedSkills: number;
    postingsWithSkills: number;
    sparkDurationMs: number;
  };
  latency: {
    pythonWarmP95Ms: number;
    requests: number;
    concurrency: number;
    environment: string;
  };
  monthly: { month: string; postings: number; withSkills: number }[];
  skills: {
    name: string;
    category: string;
    postings: number;
    monthly: { month: string; postings: number }[];
  }[];
  evidenceUrl: string;
  limitations: string[];
};
