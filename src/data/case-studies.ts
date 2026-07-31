export type CaseSlug =
  | 'invoice-pipeline'
  | 'preclear-ai'
  | 'job-market-analytics';

export type EvidenceStatus = 'verified' | 'limited' | 'withheld';

export interface CaseLink {
  label: string;
  href: string;
  kind: 'live' | 'demo' | 'source' | 'report';
  note?: string;
}

export interface ArchitectureStep {
  name: string;
  detail: string;
}

export interface CaseDecision {
  title: string;
  detail: string;
  tradeoff: string;
}

export interface EvidenceItem {
  id: string;
  status: EvidenceStatus;
  label: string;
  finding: string;
  method: string;
  source: string;
}

export interface CaseStudy {
  slug: CaseSlug;
  number: string;
  title: string;
  shortTitle: string;
  year: string;
  role: string;
  scope: string;
  evidenceStatus: string;
  outcome: string;
  summary: string;
  contributionSummary: string;
  architecture: ArchitectureStep[];
  homepageLimitation: string;
  links: CaseLink[];
  problem: string;
  constraints: string[];
  contribution: string[];
  outsideClaim: string[];
  decisions: CaseDecision[];
  evidence: EvidenceItem[];
  limitations: string[];
  scaleRedesign: string[];
}

export const selectedCaseStudies: readonly CaseStudy[] = [
  {
    slug: 'invoice-pipeline',
    number: '01',
    title: 'Automated Invoice Processing Pipeline',
    shortTitle: 'Invoice pipeline',
    year: '2025',
    role: 'Independent end-to-end builder',
    scope: 'Application, data path, infrastructure, persistence, interface',
    evidenceStatus: 'Public implementation; benchmark gap disclosed',
    outcome:
      'Built an upload-to-structured-data workflow that makes invoice extraction reviewable from ingestion through dashboard output.',
    summary:
      'A Streamlit upload flow hands work to AWS storage and orchestration, extracts fields with Textract, and persists normalized records in PostgreSQL.',
    contributionSummary:
      'I designed and built the application flow, transformation path, infrastructure definition, persistence layer, and interface.',
    architecture: [
      { name: 'Streamlit', detail: 'Upload' },
      { name: 'S3', detail: 'Object store' },
      { name: 'Step Functions', detail: 'Orchestrate' },
      { name: 'Textract', detail: 'Extract' },
      { name: 'PostgreSQL', detail: 'Persist' },
      { name: 'Dashboard', detail: 'Review' },
    ],
    homepageLimitation:
      'Processing time and OCR quality are not publicly benchmarked; the performance claim is withheld.',
    links: [
      {
        label: 'Watch 45-sec demo',
        href: 'https://github.com/Daniel21b/invoice_pipeline#-demo',
        kind: 'demo',
      },
      {
        label: 'Browse source',
        href: 'https://github.com/Daniel21b/invoice_pipeline',
        kind: 'source',
      },
    ],
    problem:
      'Invoice intake is easy to automate badly: uploads, extraction, normalization, persistence, and review can become disconnected steps with no legible failure path. The project tests a traceable path from a document upload to structured records and a human-readable output.',
    constraints: [
      'OCR output is probabilistic and invoice layouts vary.',
      'The build uses cost-conscious AWS resources rather than a production availability tier.',
      'Long-running document jobs must fit within serverless execution limits.',
      'Public evidence needs to be inspectable from the repository, not inferred from a portfolio claim.',
    ],
    contribution: [
      'Designed the end-to-end upload and processing flow.',
      'Defined the infrastructure and orchestration path.',
      'Built the extraction transformation and PostgreSQL persistence layers.',
      'Built the Streamlit interface and dashboard output.',
    ],
    outsideClaim: [
      'No client production rollout or service-level agreement.',
      'No independently audited accuracy or performance benchmark.',
      'No claim that the current infrastructure is production-ready.',
    ],
    decisions: [
      {
        title: 'Presigned upload before orchestration',
        detail:
          'The application sends invoice objects to S3, then hands a stable object reference to the workflow.',
        tradeoff:
          'This separates file transfer from processing, but introduces object lifecycle and retry concerns.',
      },
      {
        title: 'Managed OCR over custom extraction',
        detail:
          'Textract provides document-aware extraction without training and serving a bespoke model.',
        tradeoff:
          'Faster to assemble, but accuracy remains layout-dependent and each page carries cost.',
      },
      {
        title: 'Normalized persistence before reporting',
        detail:
          'Extracted fields are transformed into a PostgreSQL schema before dashboard consumption.',
        tradeoff:
          'Downstream reporting becomes predictable, but schema evolution needs explicit migrations.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'verified',
        label: 'End-to-end architecture',
        finding:
          'The public repository documents upload, AWS orchestration, Textract extraction, PostgreSQL persistence, and dashboard output.',
        method:
          'Repository structure and README architecture were inspected as the evidence surface.',
        source: 'README plus /src, /infrastructure, /database, and /app.py',
      },
      {
        id: 'E-02',
        status: 'verified',
        label: 'Working artifact',
        finding:
          'A short repository-hosted demonstration shows the application workflow.',
        method: 'Visual review of the README demo artifact.',
        source: 'README demo',
      },
      {
        id: 'E-03',
        status: 'withheld',
        label: 'Processing-time improvement',
        finding:
          'No performance result is published because the public repository does not contain a defensible benchmark.',
        method:
          'A publishable result would require a named baseline, timing protocol, sample count, and results file.',
        source: 'Evidence gap; no benchmark artifact found',
      },
    ],
    limitations: [
      'Lambda polling has a 15-minute ceiling for long-running jobs.',
      'Free-tier database idle behavior is not a production availability model.',
      'Textract creates a per-page operating cost.',
      'OCR field accuracy, exception rate, PII governance, and load behavior are not publicly benchmarked.',
    ],
    scaleRedesign: [
      'Replace long polling with asynchronous job state and resumable workers.',
      'Add field-level confidence thresholds and an explicit human review queue.',
      'Make database writes idempotent and add a dead-letter path for failed documents.',
      'Publish a structured quality benchmark with trace IDs from upload through persistence.',
    ],
  },
  {
    slug: 'preclear-ai',
    number: '02',
    title: 'PreClear AI',
    shortTitle: 'PreClear AI',
    year: '2025–present',
    role: 'Builder and data/backend engineer',
    scope: 'Ingestion, normalization, compliance API, workflow automation',
    evidenceStatus: 'Live product verified; implementation evidence private',
    outcome:
      'Built the municipal-data path behind a live permit pre-check product, turning fragmented source pages into structured compliance checks.',
    summary:
      'Python and Apify collectors normalize municipal requirements into PostgreSQL, where a FastAPI service cross-references project details for the product interface.',
    contributionSummary:
      'I built the municipal ingestion, normalization, PostgreSQL rule store, compliance cross-reference service, and GitHub Actions automation.',
    architecture: [
      { name: 'Source pages', detail: 'Municipal rules' },
      { name: 'Python / Apify', detail: 'Collect' },
      { name: 'PostgreSQL', detail: 'Normalize' },
      { name: 'FastAPI', detail: 'Cross-reference' },
      { name: 'Product UI', detail: 'Pre-check' },
    ],
    homepageLimitation:
      'Source drift, coverage, and classification error rates still need public quality reporting.',
    links: [
      {
        label: 'Open live product',
        href: 'https://www.preclearai.net/',
        kind: 'live',
      },
    ],
    problem:
      'Permit requirements are fragmented across municipal websites and change over time. The system needs to collect inconsistent source material, preserve enough structure to compare it against a project, and surface useful conflicts without hiding uncertainty.',
    constraints: [
      'Jurisdiction sites differ in structure, terminology, and update cadence.',
      'Implementation repositories are private, so public proof is limited to the live product and scoped contribution statements.',
      'Regulatory results need provenance and freshness to be trustworthy.',
      'Product design, brand, and customer operations are team-owned work.',
    ],
    contribution: [
      'Built Python and Apify collectors for municipal source pages.',
      'Normalized heterogeneous requirements into PostgreSQL.',
      'Built FastAPI cross-referencing for project and rule inputs.',
      'Added GitHub Actions automation for the backend workflow.',
    ],
    outsideClaim: [
      'Product design and brand system.',
      'Customer operations and go-to-market work.',
      'Other team-owned product implementation not listed above.',
    ],
    decisions: [
      {
        title: 'Normalize before cross-referencing',
        detail:
          'Collectors map heterogeneous municipal material into a shared rule shape before the API compares it with project details.',
        tradeoff:
          'A consistent API becomes possible, but the shared schema can erase jurisdiction-specific nuance if provenance is weak.',
      },
      {
        title: 'Separate collection from serving',
        detail:
          'Ingestion jobs update the rule store independently from the FastAPI request path.',
        tradeoff:
          'Product requests stay responsive, but stale data can persist unless freshness is monitored.',
      },
      {
        title: 'Automate the repeatable workflow',
        detail:
          'GitHub Actions handles repeatable backend checks and workflow automation.',
        tradeoff:
          'Automation reduces manual release work, but it does not replace source-level quality monitoring.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'verified',
        label: 'Live product surface',
        finding:
          'The live site exposes a Maryland permit pre-check flow and product/project tracking interface.',
        method: 'Direct product audit completed on July 30, 2026.',
        source: 'preclearai.net',
      },
      {
        id: 'E-02',
        status: 'limited',
        label: 'Implementation contribution',
        finding:
          'Backend and data contribution is stated precisely, but the supporting repository is not public.',
        method:
          'Contribution is bounded to named ingestion, storage, API, and automation components.',
        source: 'Private implementation; public code evidence pending',
      },
      {
        id: 'E-03',
        status: 'withheld',
        label: 'Jurisdiction coverage',
        finding:
          'A public coverage count is withheld until a dated, reproducible jurisdiction export is available.',
        method:
          'Publish a deduplicated export with source URL, jurisdiction, last-seen date, and rule version.',
        source: 'Evidence gap; dated coverage export needed',
      },
    ],
    limitations: [
      'Regulatory source drift can make stored requirements stale.',
      'Results need source-level citations and freshness metadata.',
      'False-positive and false-negative rates have not been publicly evaluated.',
      'Jurisdiction coverage and scraper failures need monitored reporting.',
    ],
    scaleRedesign: [
      'Version every rule with source provenance and effective dates.',
      'Use diff-based recrawls to isolate changed source material.',
      'Route low-confidence extraction to a human review queue.',
      'Add jurisdiction-level freshness, coverage, and quality dashboards.',
    ],
  },
  {
    slug: 'job-market-analytics',
    number: '03',
    title: 'Job Market Analytics',
    shortTitle: 'Job market analytics',
    year: '2024',
    role: 'Independent data project',
    scope: 'Collection, cleaning, categorization, analysis, dashboard',
    evidenceStatus: 'Public source and methodology; disputed result withheld',
    outcome:
      'Analyzed 4,100+ postings remaining after the documented validation and cleaning workflow, using Hacker News and Adzuna data from October 2023 through October 2024.',
    summary:
      'The workflow collects two distinct job-posting sources, cleans and deduplicates records, categorizes roles, runs statistical analysis, and publishes an interactive dashboard and report.',
    contributionSummary:
      'I built the collection, validation, cleaning, role categorization, statistical analysis, dashboard, and written report.',
    architecture: [
      { name: 'HN + Adzuna', detail: 'Collect' },
      { name: 'Validation', detail: 'Clean' },
      { name: 'Deduplication', detail: 'Shape' },
      { name: 'Taxonomy', detail: 'Categorize' },
      { name: 'Analysis', detail: 'Measure' },
      { name: 'Dashboard', detail: 'Report' },
    ],
    homepageLimitation:
      'The sample is not the entire labor market, and one headline trend is withheld pending dataset reconciliation.',
    links: [
      {
        label: 'Open live demo',
        href: 'https://job-market-analytics-fx.streamlit.app/',
        kind: 'live',
        note: 'May need to wake',
      },
      {
        label: 'Browse source',
        href: 'https://github.com/Daniel21b/Job-Market-Analytics',
        kind: 'source',
      },
      {
        label: 'Read report',
        href: 'https://daniel21b.github.io/Job-Market-Analytics/',
        kind: 'report',
      },
    ],
    problem:
      'Job-market claims are easy to overstate when sources, dates, cleaning, and taxonomy are implicit. This project builds a visible path from raw postings to categorized observations while keeping the sample boundary explicit.',
    constraints: [
      'Hacker News and Adzuna represent different, incomplete slices of the market.',
      'Keyword taxonomies can drift as role language changes.',
      'API access and historical windows constrain reproducibility.',
      'A free-tier Streamlit app may be asleep when a reviewer opens it.',
    ],
    contribution: [
      'Built collectors for Hacker News and Adzuna inputs.',
      'Implemented validation, cleaning, and deduplication.',
      'Defined role categorization and ran the statistical analysis.',
      'Built the dashboard, notebooks, and detailed report.',
    ],
    outsideClaim: [
      'No claim that the sample represents the full labor market.',
      'No causal inference from observed posting trends.',
      'No publication of a disputed growth result until it is reconciled.',
    ],
    decisions: [
      {
        title: 'Keep source windows explicit',
        detail:
          'The analysis names the two sources and the October 2023–October 2024 observation window.',
        tradeoff:
          'The boundary improves interpretability while limiting generalization beyond those sources and dates.',
      },
      {
        title: 'Clean before counting',
        detail:
          'The reported volume refers to records remaining after the documented validation and cleaning workflow.',
        tradeoff:
          'The number is more defensible, but changes to validation rules can change the resulting population.',
      },
      {
        title: 'Withhold unreconciled analysis',
        detail:
          'A conflicting headline trend in the README is not repeated as a portfolio result.',
        tradeoff:
          'The case presents less spectacle, but preserves a clear evidence standard.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'verified',
        label: 'Cleaned posting volume',
        finding:
          'The repository documents more than 4,100 records after validation and cleaning.',
        method:
          'Count is scoped to Hacker News and Adzuna inputs over October 2023–October 2024 and attributed to the public README workflow.',
        source: 'Public repository README',
      },
      {
        id: 'E-02',
        status: 'verified',
        label: 'Analysis workflow',
        finding:
          'Collectors, preprocessing, classification, analysis, notebooks, processed data, and reporting surfaces are publicly inspectable.',
        method: 'Repository directory and README review.',
        source: 'Public source repository',
      },
      {
        id: 'E-03',
        status: 'withheld',
        label: 'Headline growth result',
        finding:
          'The result is withheld because the README presents internally conflicting values.',
        method:
          'Recompute from a pinned processed dataset with a single metric definition and reproducible notebook.',
        source: 'Evidence conflict in public README',
      },
    ],
    limitations: [
      'Hacker News and Adzuna introduce sampling and audience bias.',
      'Keyword-based role taxonomy can drift.',
      'API access and historical date windows constrain exact reproduction.',
      'The free-tier demo may need to wake before it loads.',
    ],
    scaleRedesign: [
      'Schedule immutable raw-data snapshots partitioned by source and collection date.',
      'Version the classification taxonomy with every published result.',
      'Add labeled fixtures and regression tests for categorization.',
      'Publish a reproducible metric notebook with data-quality checks.',
    ],
  },
] as const;

export const otherWork = [
  {
    organization: 'ICATT Consulting',
    work: 'Revenue reporting data model and reconciliation workflow',
    stack: 'Python / SQL / Redshift / Power BI',
    note: 'Employer work; implementation details limited',
  },
  {
    organization: 'Boost Labs',
    work: 'Recurring reporting pipelines and Tableau KPI workflows',
    stack: 'Python / SQL / Tableau',
    note: 'Employer work; implementation details limited',
  },
] as const;

export const getCaseStudy = (slug: string) =>
  selectedCaseStudies.find((caseStudy) => caseStudy.slug === slug);

export const getAdjacentCases = (slug: CaseSlug) => {
  const index = selectedCaseStudies.findIndex(
    (caseStudy) => caseStudy.slug === slug,
  );

  return {
    previous:
      index > 0
        ? selectedCaseStudies[index - 1]
        : selectedCaseStudies[selectedCaseStudies.length - 1],
    next:
      index < selectedCaseStudies.length - 1
        ? selectedCaseStudies[index + 1]
        : selectedCaseStudies[0],
  };
};
