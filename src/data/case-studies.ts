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
    title: 'PreClear Permit Compliance Platform',
    shortTitle: 'PreClear AI',
    year: '2025–present',
    role: 'Independent builder · data/backend engineer',
    scope: 'Scheduled ingestion, compliance schema, permit decision service',
    evidenceStatus: 'Live surface + private code trace; limits disclosed',
    outcome:
      'Built two separately clocked paths—scheduled ordinance ingestion and request-time permit resolution—that converge on one cited compliance decision.',
    summary:
      'Python prepares versionable ordinance knowledge in Supabase/PostgreSQL. A Next.js and TypeScript route resolves requests through deterministic rules first, then jurisdiction-scoped hybrid retrieval with an explicit uncertainty fallback.',
    contributionSummary:
      'GitHub history attributes all 47 commits across the two audited private repositories to me; I built the scoped ingestion, schema, decision, retrieval, and weekly automation paths described here.',
    architecture: [
      { name: 'JSONL snapshot', detail: 'Scraper-produced input' },
      { name: 'Python ingestion', detail: 'Filter + normalize' },
      { name: 'Supabase / pgvector', detail: 'Rules + knowledge' },
      { name: 'Next.js route', detail: 'Authorize + resolve' },
      { name: 'Rules / hybrid search', detail: 'Two-track decision' },
      { name: 'Decision record', detail: 'Result + citation' },
    ],
    homepageLimitation:
      'Current retrieval calibration, scheduled reliability, test health, release parity, coverage, and accuracy are disclosed as unresolved.',
    links: [
      {
        label: 'Open live product',
        href: 'https://www.preclearai.net/',
        kind: 'live',
      },
    ],
    problem:
      'Permit requirements live in jurisdiction-specific documents that change independently and use inconsistent language. The system must prepare source-backed knowledge on one clock, resolve project questions on another, and stop rather than fabricate certainty when rules or retrieval evidence are insufficient.',
    constraints: [
      'The checked-in artifact contains 354 raw chunks from 39 distinct source URLs and 21 county values; it is not proof of active production coverage.',
      'The source-collection implementation is private or absent from the audited repositories, so the scraper boundary remains unproven.',
      'The live product and audited private commit are not proven to be the same release.',
      'Permit output needs dated source provenance, calibrated retrieval, and legal review; none is represented as a legal determination.',
    ],
    contribution: [
      'Built Python filtering, county normalization, content-hash deduplication, batched embedding, retry, and Supabase/PostgreSQL upsert logic.',
      'Designed the jurisdiction, rule, document, ordinance-chunk, retrieval, provenance, project, and access-control schema.',
      'Built the Next.js/TypeScript permit-check route with Zod validation, session and entitlement checks, deterministic rule evaluation, and guarded hybrid retrieval.',
      'Configured the manual and weekly GitHub Actions ingestion workflow.',
    ],
    outsideClaim: [
      'Legal or permitting accuracy, professional advice, or approval authority.',
      'Production adoption, business impact, uptime, latency, or service levels.',
      'Product design, brand, and customer or go-to-market work.',
      'Coverage beyond the checked-in snapshot or exact parity between the audited commit and live domain.',
    ],
    decisions: [
      {
        title: 'Deterministic rules before generation',
        detail:
          'The request path queries active permit_rules and evaluates explicit project thresholds before hybrid retrieval or an LLM is considered.',
        tradeoff:
          'Auditable rules can resolve known cases without generation, but the current first-match behavior lacks explicit precedence and compound-rule handling.',
      },
      {
        title: 'Content hashes before embedding and upsert',
        detail:
          'Normalized chunk text is hashed and existing hashes are skipped before paid embedding and database writes.',
        tradeoff:
          'Exact duplicate work is avoided, but meaningful source revisions still need document-level versioning and review.',
      },
      {
        title: 'Jurisdiction-scoped hybrid retrieval',
        detail:
          'The database RPC fuses pgvector similarity with PostgreSQL full-text ranking instead of relying on vector proximity alone.',
        tradeoff:
          'Lexical and semantic signals can complement one another, but RRF scores require calibration against a labeled retrieval set.',
      },
      {
        title: 'Make uncertainty an explicit product state',
        detail:
          'Insufficient retrieval returns VERIFY_WITH_COUNTY instead of asking the model to produce an ungrounded compliance answer.',
        tradeoff:
          'The system declines more requests, but preserves a visible distinction between evidence and guesswork.',
      },
      {
        title: 'Separate scheduled knowledge work from serving',
        detail:
          'A weekly Python workflow prepares ordinance chunks independently from the authenticated Next.js request path.',
        tradeoff:
          'Request latency does not absorb crawl and embedding work, but failed schedules can silently leave the serving path stale without monitoring.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'verified',
        label: 'Live product surface',
        finding:
          'The live site exposes a Maryland permit pre-check surface and project-tracking examples.',
        method: 'Direct product audit completed on July 30, 2026.',
        source: 'preclearai.net',
      },
      {
        id: 'E-02',
        status: 'verified',
        label: 'Private architecture trace',
        finding:
          'The two audited private repositories contain the scheduled ingestion path, database migrations, permit-check route, hybrid retrieval function, prompt constraint, entitlements, and tests.',
        method:
          'Traced each boundary to a private repository path; GitHub attributes all 38 SaaS commits and all 9 pipeline commits to Daniel21b.',
        source: 'Private permitsaas and PreClear_pipeline repositories',
      },
      {
        id: 'E-03',
        status: 'verified',
        label: 'Repository source snapshot',
        finding:
          'The checked-in JSONL contains 354 raw chunks from 39 unique document/source URLs across 21 county values; 331 passed filters in the latest inspected run.',
        method:
          'Counted repository records, distinct source URLs, and county values, then compared the latest workflow log.',
        source: 'PreClear_pipeline/data/chunks.jsonl; latest ingestion log',
      },
      {
        id: 'E-04',
        status: 'limited',
        label: 'Local test health',
        finding:
          'The inspected local Vitest run completed with 274 tests passing and 5 failing across 6 files, plus unhandled mock errors.',
        method:
          'Ran the private application test suite locally on July 30, 2026; the suite is not green.',
        source: 'permitsaas/__tests__; local Vitest output',
      },
      {
        id: 'E-05',
        status: 'limited',
        label: 'Scheduled automation reliability',
        finding:
          'GitHub records 33 ingestion runs: 6 successes, 26 failures, and 1 cancellation; the latest ten inspected schedules failed.',
        method:
          'Inspected GitHub Actions run history on July 30, 2026; the July 26 run stopped at database authentication.',
        source: 'PreClear_pipeline GitHub Actions history',
      },
      {
        id: 'E-06',
        status: 'limited',
        label: 'Deployment artifact',
        finding:
          'Vercel records a successful production deployment for private application commit c840010 on March 9, 2026.',
        method:
          'Inspected the private repository deployment record; no evidence binds that commit to the current live domain.',
        source: 'Private GitHub/Vercel deployment record',
      },
      {
        id: 'E-07',
        status: 'withheld',
        label: 'Quality and business outcomes',
        finding:
          'Accuracy, freshness, active coverage, latency, adoption, and business impact remain withheld.',
        method:
          'Publish a dated labeled evaluation set, coverage manifest, freshness definition, environment, baselines, sample counts, and raw results.',
        source: 'Evidence gap; no reproducible measurement artifact',
      },
    ],
    limitations: [
      'The RRF score has a theoretical maximum near 0.041 while the route compares it with 0.35, likely making the generated-answer branch unreachable.',
      'Any non-VERIFY_WITH_COUNTY generated answer is normalized to permit_required, so a generated “not required” answer can be misclassified.',
      'Deterministic resolution returns the first matching rule without explicit precedence or compound-rule handling; seeded rules are labeled examples requiring verification.',
      'The latest ten scheduled ingestion runs failed, most recently at database authentication.',
      'The local suite is not green: 274 tests passed and 5 failed, with additional unhandled mock errors.',
      'Build-time Stripe initialization requires a local secret during page-data collection instead of being lazy at the service boundary.',
      'Live-release parity, the private source collector, and dated accuracy/freshness/coverage evaluation remain unverified.',
    ],
    scaleRedesign: [
      'Calibrate hybrid ranking and its gate against a labeled jurisdiction-level retrieval set, then version the chosen threshold.',
      'Represent answer polarity as a typed result and test required, not-required, and uncertain outcomes end to end.',
      'Add rule priority, compound-condition evaluation, effective dates, and a verification workflow for seeded rules.',
      'Repair database credentials, add schedule-health alerts, and publish freshness/coverage manifests for every run.',
      'Make Stripe and other service clients initialize lazily so builds and isolated tests do not require production secrets.',
      'Publish release SHAs beside the live surface and bind deployment records to a visible application version.',
      'Add source versioning, human legal review, and dated precision, recall, freshness, and latency reporting with baselines.',
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
