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
    scope: 'Portal, three intake paths, event handler, schema, review surfaces',
    evidenceStatus: 'Public code + demo; 51 focused local tests',
    outcome:
      'Built three invoice intake paths that converge on one traceable PostgreSQL record model, then feed analytics, search, audit, and export.',
    summary:
      'An authenticated Streamlit portal accepts documents, spreadsheets, or manual entries. Each path validates and normalizes its input before persisting a classified invoice record.',
    contributionSummary:
      'I independently built the portal, intake logic, CDK-defined AWS path, parser, database layer, analytics, audit, and export surfaces.',
    architecture: [
      { name: 'Streamlit', detail: '3 intake modes' },
      { name: 'S3 / Pandas / SQL', detail: 'Validate by path' },
      { name: 'Lambda + Textract', detail: 'Document path' },
      { name: 'PostgreSQL', detail: 'Shared schema' },
      { name: 'Review surfaces', detail: 'Analyze + audit' },
    ],
    homepageLimitation:
      'Accuracy, runtime, cost, throughput, and scale remain withheld until dated measurement artifacts exist.',
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
      'Invoice intake arrives in three different shapes: documents need OCR, spreadsheets need schema validation, and manual records need form validation. The engineering problem is not simply extraction; it is making every path produce one reviewable, classified record with a visible source and audit trail.',
    constraints: [
      'Synchronous Textract accepts a single-page document up to 10 MB, while the CDK-configured Lambda timeout is 120 seconds.',
      'S3 notifications are delivered at least once and can arrive more than once or out of order.',
      'OCR LINE blocks are interpreted with heuristics, so layout variation can produce incomplete or incorrect fields.',
      'PostgreSQL, networking, and credentials sit outside the CDK stack and must be configured separately.',
    ],
    contribution: [
      'Designed and built the authenticated Streamlit portal with document, spreadsheet, and manual intake.',
      'Defined S3, Lambda, IAM, event notifications, configuration, and the psycopg2 layer in AWS CDK.',
      'Built the Lambda validation path, Textract call, heuristic field parser, and PostgreSQL persistence.',
      'Built the shared schema, analytics, search/details, soft-delete/restore, audit, and CSV export flows.',
    ],
    outsideClaim: [
      'Production adoption, business outcome, uptime, and service-level guarantees.',
      'AWS account setup, RDS provisioning, VPC/networking, and a public application endpoint.',
      'Independently audited accuracy, runtime, cost, throughput, or scale results.',
      'Production readiness or complete deployment integration coverage.',
    ],
    decisions: [
      {
        title: 'Direct S3 notification instead of an orchestrator',
        detail:
          'The portal uploads with server-side boto3; an ObjectCreated notification invokes the processor Lambda directly.',
        tradeoff:
          'The path is short and legible, but it has no durable queue, replay control, or state machine between storage and processing.',
      },
      {
        title: 'Synchronous Textract for the document path',
        detail:
          'The handler calls DetectDocumentText and converts returned LINE blocks during the same Lambda invocation.',
        tradeoff:
          'The implementation is straightforward, but it inherits the 10 MB single-page boundary and ties extraction time to the 120-second Lambda window.',
      },
      {
        title: 'One invoice schema for all three inputs',
        detail:
          'Document parsing, confirmed spreadsheet rows, and manual form entries converge on the same invoices table with source metadata.',
        tradeoff:
          'Analytics and review queries stay consistent, but the shared model must retain enough provenance to explain how each field was produced.',
      },
      {
        title: 'Route bulk writes at 100 rows',
        detail:
          'Spreadsheet imports use row-wise INSERT below 100 rows and PostgreSQL COPY at 100 rows or above.',
        tradeoff:
          'Small imports keep simple error behavior while larger ones use a faster path; maintaining two write paths increases test surface.',
      },
      {
        title: 'Configuration-backed credentials',
        detail:
          'The portal administrator credential comes from Streamlit secrets, while database credentials are supplied through environment configuration.',
        tradeoff:
          'This is workable for a development deployment, but production would require managed secret rotation and private database networking.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'verified',
        label: 'Architecture wiring',
        finding:
          'The repository contains the portal, CDK stack, S3 notification, Lambda handler, parser, shared schema, database manager, and review pages.',
        method:
          'Read the implementation at each boundary and traced its input into the next component.',
        source:
          'invoice_pipeline_stack.py; app.py; invoice_processor.py; database.py; schema.sql',
      },
      {
        id: 'E-02',
        status: 'verified',
        label: 'Handler and parser behavior',
        finding:
          'The focused local verification completed with 51 passing unit tests.',
        method:
          'Ran the handler and parser unit-test files locally on July 30, 2026; this is not a public CI result.',
        source:
          'tests/unit/test_invoice_processor.py; tests/unit/test_textract_parser.py',
      },
      {
        id: 'E-03',
        status: 'verified',
        label: 'Demonstrated workflow',
        finding:
          'A repository-hosted 45-second recording shows the application workflow in use.',
        method:
          'Reviewed the video artifact linked from the repository README.',
        source: 'README demo video',
      },
      {
        id: 'E-04',
        status: 'limited',
        label: 'Deployment integration',
        finding:
          'The component implementation is public, but end-to-end deployment behavior is not fully proven.',
        method:
          'Integration tests in the repository are explicitly skipped; no complete public CI run is presented.',
        source: 'Integration-test configuration and repository test suite',
      },
      {
        id: 'E-05',
        status: 'withheld',
        label: 'Performance and quality outcomes',
        finding:
          'Accuracy, runtime, cost, throughput, and scale claims are withheld.',
        method:
          'Publish a dated fixture corpus, environment, baseline, sample count, measurement protocol, and raw result artifact.',
        source: 'Evidence gap; no publishable result artifact',
      },
    ],
    limitations: [
      'At-least-once S3 events can duplicate or reorder work; the generated idempotency string is neither checked nor persisted.',
      'There is no queue, dead-letter path, replay mechanism, or workflow state between S3 and Lambda.',
      'Synchronous Textract and a regex-style LINE parser limit document size, layout tolerance, and failure recovery.',
      'No confidence-based review routing is active, even though a confidence accessor exists.',
      'Lambda receives database credentials through environment configuration; RDS and networking remain external.',
      'The development bucket uses a destructive removal policy and wildcard CORS.',
      'No dated accuracy, latency, cost, throughput, or load artifact is published.',
    ],
    scaleRedesign: [
      'Add a durable queue or orchestration layer with retries, a dead-letter queue, and replayable execution state.',
      'Enforce idempotency with an object-version or content-hash key before any database write.',
      'Move large or multi-page documents to asynchronous Textract and resumable status handling.',
      'Record field-level confidence and route uncertain invoices to explicit human review.',
      'Use Secrets Manager, private networking, and RDS Proxy for credential and connection control.',
      'Adopt non-destructive retention, a fixture corpus, and dated accuracy, latency, and cost reporting.',
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
