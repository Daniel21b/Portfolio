export type CaseSlug =
  | 'invoice-pipeline'
  | 'preclear-ai'
  | 'tech-skill-demand-platform';

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
    slug: 'tech-skill-demand-platform',
    number: '03',
    title: 'Tech Skill Demand Platform',
    shortTitle: 'Skill demand',
    year: '2025',
    role: 'Independent data workflow · sole public author',
    scope: 'Two-source collection, validation, taxonomy, analysis, reporting',
    evidenceStatus: 'Public code + checked-in data; scale claims withheld',
    outcome:
      'Built a traceable Python workflow that turns two noisy job-posting sources into a checked-in 4,137-row analysis artifact, then exposes exactly where the data is strong enough to inspect—and where trend claims must stop.',
    summary:
      'Adzuna API pages and Hacker News hiring threads land as raw CSV checkpoints. Pandas validates, aligns, and deduplicates the sources; an explicit regex taxonomy separates AI/ML, general IT, hybrid, and non-tech roles; notebooks and Streamlit turn the retained records into reviewable analysis surfaces.',
    contributionSummary:
      'I built the collection notebooks, validation and deduplication path, role-family taxonomy, analysis notebooks, Streamlit dashboard, and static report. GitHub attributes all nine public commits to my Git identity.',
    architecture: [
      { name: 'HN + Adzuna', detail: 'Raw checkpoints' },
      { name: 'Pandas contract', detail: 'Validate + align' },
      { name: 'Deduplication', detail: '4,137 retained' },
      { name: '135-pattern taxonomy', detail: 'Score role families' },
      { name: 'Notebooks', detail: 'Analyze carefully' },
      { name: 'Dashboard + report', detail: 'Expose proof' },
    ],
    homepageLimitation:
      'The cleaned row count and code path are inspectable; the proposed cloud stack, large-scale metrics, and longitudinal trend claims remain withheld until implementation and dated measurement artifacts exist.',
    links: [
      {
        label: 'Dashboard deployment',
        href: 'https://job-market-analytics-fx.streamlit.app/',
        kind: 'live',
        note: 'Current auth redirect; availability limited',
      },
      {
        label: 'Browse source',
        href: 'https://github.com/Daniel21b/Job-Market-Analytics',
        kind: 'source',
      },
      {
        label: 'Read static report',
        href: 'https://daniel21b.github.io/Job-Market-Analytics/',
        kind: 'report',
      },
    ],
    problem:
      'Job-market claims become fragile when source windows, parser behavior, cleaning rules, and data dates disappear behind a chart. This project creates an inspectable path from two noisy inputs to a pinned analytical artifact—and treats unresolved date and result conflicts as a stop condition, not a footnote.',
    constraints: [
      'Hacker News prose and Adzuna API records have different schemas, collection failure modes, and audience bias.',
      'The final artifact has only three material month buckets—298 rows in 2024-05, 231 in 2024-10, and 3,608 in 2025-10—contradicting the README’s 13-month range.',
      'Several Hacker News files contain false positives, and only May and October contribute materially to the retained source data.',
      'The dashboard deployment currently enters an authentication redirect loop and can silently generate synthetic data when expected source files are absent.',
    ],
    contribution: [
      'Built the rate-limited Hacker News parser and paginated Adzuna API collector with ID deduplication and checkpoints.',
      'Built the source-specific validation, 21-column schema alignment, source-prefixed IDs, and multi-stage deduplication path.',
      'Defined the 135-pattern role-family scoring taxonomy and authored the statistical-analysis notebooks.',
      'Built the Streamlit dashboard and published the final report; GitHub attributes all 9/9 public commits to me.',
    ],
    outsideClaim: [
      'The proposed skill-demand-platform repository and PySpark, Airbyte, Airflow, dbt, BigQuery, or Docker implementation.',
      '120K+ postings, eight months of queryable history, 18% duplicate removal, or 500+ normalized skill tags.',
      '40-to-12-minute runtime, 40+ dbt tests, Airflow freshness alerts, or 4 GB-to-1.5 GB query-scan improvements.',
      'Full-labor-market representation, causal inference, or unreconciled longitudinal growth findings.',
    ],
    decisions: [
      {
        title: 'Checkpoint API collection',
        detail:
          'Adzuna results are persisted as collection progresses instead of waiting for one terminal export.',
        tradeoff:
          'Partial work survives a later request failure, but checkpoints need run manifests and immutable load timestamps to become an auditable ingestion layer.',
      },
      {
        title: 'Prefix source IDs before union',
        detail:
          'Identifiers are namespaced before Hacker News and Adzuna rows share one schema.',
        tradeoff:
          'Cross-source collisions are prevented, but identity still depends on later business-key and similarity rules for reposts.',
      },
      {
        title: 'Validate Hacker News separately',
        detail:
          'Free-text comment parsing receives content, role, company, and job-signal checks before schema union.',
        tradeoff:
          'Source-specific checks isolate parser failures, but heuristic validation can still retain false positives or reject legitimate prose.',
      },
      {
        title: 'Use an explicit scoring taxonomy',
        detail:
          'An explicit set of 135 regex patterns scores four role families instead of hiding classification inside an opaque model call.',
        tradeoff:
          'Rules are inspectable and cheap to rerun, but language drift and overlapping patterns require labeled regression fixtures.',
      },
      {
        title: 'Publish surfaces; withhold conclusions',
        detail:
          'The repository, dashboard, and report stay public while conflicting time windows and headline results are called out.',
        tradeoff:
          'A reviewer can inspect the work now, but longitudinal conclusions remain unpublished until a pinned reproducible rerun resolves the conflict.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'verified',
        label: 'Cleaned artifact and source split',
        finding:
          'jobs_cleaned.csv contains 4,137 rows: 3,608 Adzuna and 529 Hacker News, with zero exact or company+role+location duplicates.',
        method:
          'Counted the checked-in CSV and grouped its source values on July 31, 2026.',
        source: 'notebooks/data/processed/jobs_cleaned.csv',
      },
      {
        id: 'E-02',
        status: 'verified',
        label: 'Source-specific filtering results',
        finding:
          'Saved outputs record Adzuna 5,000 candidates → 3,691 unique IDs in 10.6 minutes (1,309 repeats / 26.2%) and HN 711 → 611 (100 invalid / 14.1%).',
        method:
          'Inspected the persisted run output in the public collection and cleaning notebooks.',
        source:
          'notebooks/02_api_data_collection.ipynb · notebooks/03_data_cleaning.ipynb',
      },
      {
        id: 'E-03',
        status: 'verified',
        label: 'Architecture and public authorship',
        finding:
          'The repository exposes collection, cleaning, taxonomy, analysis, application, and report boundaries; GitHub attributes all nine public commits to Daniel Berhane.',
        method:
          'Traced the seven notebooks and app, then verified the full public GitHub commit history.',
        source: 'Public repository tree and 9/9 GitHub commits',
      },
      {
        id: 'E-04',
        status: 'limited',
        label: 'Published dashboard and report',
        finding:
          'The static report is reachable. The Streamlit URL and implementation exist, but the deployment currently enters an authentication redirect loop; data version, parity, and freshness are not proven.',
        method:
          'Checked both public URLs and traced their implementation paths without treating a deployment link as release provenance.',
        source: 'Streamlit app · GitHub Pages report · app.py',
      },
      {
        id: 'E-05',
        status: 'withheld',
        label: 'Platform-scale claims',
        finding:
          'The proposed enterprise stack, large-scale counts, performance gains, test volume, alerting, and BigQuery scan reductions are not published as implemented results.',
        method:
          'Restore only with component configs, run history, a dated data manifest, test output, query plans/bytes billed, and a benchmark protocol naming environment, baseline, sample size, and raw results.',
        source:
          'Evidence gap; exact skill-demand-platform repository does not exist',
      },
    ],
    limitations: [
      'The proposed skill-demand-platform repository does not exist; the audited source remains Job-Market-Analytics.',
      'PySpark, Airbyte, Airflow, dbt, BigQuery, and Docker are not implemented in the current repository.',
      'The final artifact contains only 298 rows in 2024-05, 231 in 2024-10, and 3,608 in 2025-10, contradicting the README’s 13-month framing.',
      'Hacker News collection succeeded materially for only two months, and several checked-in files contain false positives.',
      'The date filter mixes timezone-aware API timestamps with naive bounds, catches the comparison error, and returns true, allowing 2025 records through the intended 2023–2024 filter.',
      'Notebook execution stops before saved deduplication or taxonomy outputs in places; the final CSV exists without a complete run record.',
      'There are no automated tests or CI checks for collection, validation, taxonomy, or report generation.',
      'Streamlit can silently replace missing source data with randomized synthetic data.',
      'A committed Adzuna credential must be rotated or revoked and removed from Git history before this repository is promoted as safe public proof.',
      'The README lists directories and files that are absent from the repository.',
    ],
    scaleRedesign: [
      'Future state — use Airbyte incremental ingestion with immutable source/load timestamps and per-run manifests.',
      'Future state — separate BigQuery raw, staging, and mart layers; partition by posting date and cluster only after workload evidence supports it.',
      'Future state — introduce PySpark parsing or deduplication only when row volume and profiling justify distributed execution, then publish Spark UI and benchmark artifacts.',
      'Future state — build dbt models, tests, and source-freshness checks with committed manifests and results.',
      'Future state — orchestrate retries, idempotency, failure alerts, and backfill semantics in Airflow.',
      'Future state — Dockerize local and runtime environments for dependency parity.',
      'Future state — add a dated measurement harness for row counts, duplicate rates, runtimes, bytes billed, baselines, and sample sizes.',
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
