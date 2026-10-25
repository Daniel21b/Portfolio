export type CaseSlug =
  | 'tech-skill-demand-platform'
  | 'invoice-pipeline'
  | 'preclear-ai';

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
    slug: 'tech-skill-demand-platform',
    number: '01',
    title: 'Job Posting Skill Demand Analyzer Engine & REST API',
    shortTitle: 'Skill analytics',
    year: 'Jan–Mar 2025 · Updated Oct 2026',
    role: 'Independent distributed/backend builder',
    scope: 'Distributed processing, REST API, caching, database, CI/CD',
    evidenceStatus:
      'Locally validated on August 7, 2026; scale claims withheld',
    outcome:
      'Validated an asynchronous Python and PySpark engine on 4,137 fixture rows: 4,135 canonical postings, 2,164 skill matches across 65 canonical skills, and 1.989ms p95 over 100 populated warm-cache requests.',
    summary:
      'The service cleans unstructured postings, removes duplicate reposts, distributes processing across Spark workers, persists indexed results in PostgreSQL, and uses Redis cache-aside reads for low-latency multi-attribute filters.',
    contributionSummary:
      'I built the asynchronous processing service, FastAPI endpoints, Redis cache-aside layer, Spark partitioning strategy, PostgreSQL indexes, Docker packaging, and automated GitHub Actions tests.',
    architecture: [
      { name: 'FastAPI', detail: 'Async run submission' },
      { name: 'Redis', detail: 'Queue + cache-aside' },
      { name: 'PySpark', detail: '4,137 → 4,135 rows' },
      { name: 'Skill extraction', detail: '2,164 matches · 65 skills' },
      { name: 'PostgreSQL', detail: 'Indexed + idempotent' },
      { name: 'Metrics API', detail: '1.989ms p95 locally' },
    ],
    homepageLimitation:
      'Development-scale validation only; 120K scale, an 18% duplicate rate, 500+ matched skills, and a 40-to-12-minute reduction remain withheld.',
    links: [
      {
        label: 'Open legacy dashboard',
        href: 'https://job-market-analytics-fx.streamlit.app/',
        kind: 'live',
      },
      {
        label: 'Browse source',
        href: 'https://github.com/Daniel21b/Job-Market-Analytics',
        kind: 'source',
      },
    ],
    problem:
      'Unstructured job postings are expensive to clean and slow to query directly. The system needed to deduplicate reposts, normalize inconsistent skill language, move blocking Spark work out of the request path, and expose aggregation results at interactive API latency.',
    constraints: [
      'The input contains unstructured text, inconsistent terminology, and duplicate reposts.',
      'Distributed joins can produce partition memory skew when high-cardinality keys are unevenly distributed.',
      'Multi-attribute aggregation queries need predictable latency without recomputing the same results.',
      'The processing, API, cache, and database services need repeatable local and CI environments.',
    ],
    contribution: [
      'Built an asynchronous Python and PySpark service that reconciled a 4,137-row fixture into 4,135 canonical postings, recorded two duplicate decisions, and produced 2,164 matches across 65 canonical skills.',
      'Developed FastAPI endpoints with a Redis cache-aside layer; a populated development-scale benchmark measured 1.989ms p95 over 100 warm multi-attribute requests with 100 of 100 cache hits.',
      'Instrumented partition skew and repartitioned on a high-cardinality composite join key; the validated optimized local run completed in 17.627 seconds and recorded skew ratios of 1.644 before and 1.060 after.',
      'Containerized the services with Docker, designed PostgreSQL composite-key indexes, and implemented unit, Spark contract, service-integration, and image-build checks in GitHub Actions.',
    ],
    outsideClaim: [
      'Production adoption, uptime, or contractual service-level guarantees.',
      'Representation of the entire labor market or causal conclusions about hiring trends.',
      'Benchmark behavior on infrastructure or workloads outside the measured project environment.',
    ],
    decisions: [
      {
        title: 'Distribute cleaning and extraction with PySpark',
        detail:
          'Python coordinates asynchronous processing while PySpark handles cleaning, deduplication, and normalized skill extraction across the posting corpus.',
        tradeoff:
          'Distributed execution supports larger batches, but introduces partitioning, serialization, and worker-memory concerns that a single-process workflow avoids.',
      },
      {
        title: 'Repartition on a composite join key',
        detail:
          'Spark workers are repartitioned around the high-cardinality key used by repost comparison, while each run records before-and-after partition profiles.',
        tradeoff:
          'The local optimized run completed in 17.627 seconds and recorded skew ratios of 1.644 before and 1.060 after; no repeated same-input baseline exists, so a runtime reduction is not claimed.',
      },
      {
        title: 'Cache aggregation responses in Redis',
        detail:
          'FastAPI uses a cache-aside path for repeated multi-attribute aggregation queries.',
        tradeoff:
          'Cached reads reach interactive latency, while invalidation and freshness rules become explicit application responsibilities.',
      },
      {
        title: 'Index the PostgreSQL query shape',
        detail:
          'Composite-key indexes are designed around the filters and aggregations exposed by the REST API.',
        tradeoff:
          'Read performance improves for known query patterns at the cost of additional storage and write overhead.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'verified',
        label: 'Fixture processing',
        finding:
          '4,137 input rows produced 4,135 canonical postings, two duplicate decisions, and 2,164 skill-match rows across 65 canonical skills.',
        method:
          'Ran the asynchronous API-to-worker-to-Spark-to-PostgreSQL path and independently reconciled the input count with pandas.',
        source: 'docs/LOCAL_VALIDATION.md · August 7, 2026',
      },
      {
        id: 'E-02',
        status: 'verified',
        label: 'Warm-cache latency',
        finding:
          'A populated local benchmark returned 100 of 100 Redis cache hits at 0.898ms p50, 1.989ms p95, and 4.013ms maximum latency.',
        method:
          'Sent 100 warm multi-attribute requests against populated PostgreSQL tables through the FastAPI metrics endpoint.',
        source: 'docs/LOCAL_VALIDATION.md · August 7, 2026',
      },
      {
        id: 'E-03',
        status: 'withheld',
        label: 'Scale and speedup claims',
        finding:
          '120,000 postings, 18% duplicate removal, 500+ matched skills, and a 40-to-12-minute Spark reduction are not claimed.',
        method:
          'Require an immutable production-scale dataset plus repeated same-input baseline and optimized runs before publishing these figures.',
        source: 'Explicit validation boundary in docs/LOCAL_VALIDATION.md',
      },
      {
        id: 'E-04',
        status: 'withheld',
        label: 'Production outcomes',
        finding:
          'Production adoption, uptime, operating cost, and long-term service levels are not claimed.',
        method:
          'Publish production telemetry and a dated benchmark protocol before adding those claims.',
        source: 'Outside current project evidence',
      },
    ],
    limitations: [
      'The validated fixture contains 4,137 rows and does not demonstrate production-scale throughput.',
      'Only one optimized 17.627-second local Spark run is recorded; there is no same-input baseline series.',
      'The 1.989ms p95 result is a populated development-scale warm-cache benchmark, not a production SLA.',
      'No production adoption, uptime, or cost history is presented.',
    ],
    scaleRedesign: [
      'Pin a versioned 120K-plus input manifest and publish row-level reconciliation artifacts for every run.',
      'Run repeated same-input baseline and optimized Spark trials with cluster, partition, and memory settings recorded.',
      'Monitor Spark skew, cache hit rate, API latency, database plans, and data freshness in a deployed environment.',
      'Introduce durable job state, retries, and dead-letter handling for long-running asynchronous work.',
    ],
  },
  {
    slug: 'invoice-pipeline',
    number: '02',
    title: 'Paper-to-Digital Invoice Intelligence Platform',
    shortTitle: 'Invoice intelligence',
    year: 'Jul–Sep 2025 · Updated Oct 2026',
    role: 'Independent backend builder',
    scope:
      'Python, PostgreSQL, Lambda, Step Functions, S3, Textract, Amazon Bedrock, Streamlit',
    evidenceStatus:
      'Implementation added October 2026; local tests, cloud validation pending',
    outcome:
      'Built a CDK-defined serverless invoice workflow: Step Functions coordinates Textract and Lambda, Amazon Bedrock suggests missing or low-confidence fields, and Streamlit verifies uncertain values before PostgreSQL persistence.',
    summary:
      'Built a CDK-defined serverless invoice workflow: Step Functions coordinates Textract and Lambda, Amazon Bedrock suggests missing or low-confidence fields, and Streamlit verifies uncertain values before PostgreSQL persistence.',
    contributionSummary:
      'Built a serverless invoice pipeline with AWS CDK and Step Functions coordinating Textract extraction and Lambda processing. Added a Streamlit review screen that keeps uncertain extractions out of PostgreSQL until a reviewer validates them. Added Amazon Bedrock fallback extraction for missing or low-confidence fields using the existing invoice schema.',
    architecture: [
      {
        name: 'S3',
        detail: 'Private invoice upload',
      },
      {
        name: 'Step Functions + Lambda',
        detail: 'Coordinate Textract extraction',
      },
      {
        name: 'Amazon Bedrock',
        detail: 'Recover uncertain fields',
      },
      {
        name: 'Review gate',
        detail: 'Streamlit verifies candidates',
      },
      {
        name: 'PostgreSQL',
        detail: 'Save validated invoice fields',
      },
    ],
    homepageLimitation:
      'Locally tested implementation; AWS execution and database integration still require deployment validation.',
    links: [
      {
        label: 'Browse source',
        href: 'https://github.com/Daniel21b/invoice_pipeline',
        kind: 'source',
      },
    ],
    problem:
      'Invoice OCR can miss fields or assign low confidence. Unverified values need review before they become database records.',
    constraints: [
      'Locally tested implementation; AWS execution and database integration still require deployment validation.',
      'Current AnalyzeExpense path is synchronous and supports single-page PDFs and supported images; multi-page asynchronous processing is not implemented.',
      'Initial project: July–September 2025. Further development in October 2026 added Step Functions orchestration, human review and Bedrock fallback.',
    ],
    contribution: [
      'Built a serverless invoice pipeline with AWS CDK and Step Functions coordinating Textract extraction and Lambda processing.',
      'Added a Streamlit review screen that keeps uncertain extractions out of PostgreSQL until a reviewer validates them.',
      'Added Amazon Bedrock fallback extraction for missing or low-confidence fields using the existing invoice schema.',
    ],
    outsideClaim: [
      'Production adoption, uptime, accuracy or latency guarantees.',
      'Retrospective proof that newly added features existed during the project dates.',
    ],
    decisions: [
      {
        title: 'Hold uncertain records outside PostgreSQL',
        detail:
          'Private S3 stores extraction candidates; the review gate writes only verified fields into the invoice table.',
        tradeoff: 'Review adds operator effort and completion time.',
      },
      {
        title: 'Keep model suggestions reviewable',
        detail:
          'Bedrock recovers requested fields from OCR text without replacing high-confidence values. Model-derived fields always require review.',
        tradeoff:
          'The model cannot recover text absent from the OCR transcript; the original document remains available to reviewers.',
      },
      {
        title: 'Use an isolated CDK stack',
        detail:
          'The intelligence stack defines S3, Lambda, Step Functions and scoped permissions. Existing PostgreSQL and its secret are deployment inputs.',
        tradeoff:
          'Database networking and model access must be configured for the deployment.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'limited',
        label: 'Implementation and local verification',
        finding:
          'New implementation and focused tests were added in October 2026. Deployment and live provider validation remain pending.',
        method:
          'Local domain, orchestration and API checks; provider responses are mocked.',
        source: 'Repository implementation and test files',
      },
      {
        id: 'E-02',
        status: 'withheld',
        label: 'Deployment and measured outcomes',
        finding:
          'No new cloud deployment, production benchmark or coverage measurement is claimed.',
        method:
          'Verify deployed services and publish dated measurement artifacts before adding outcome claims.',
        source: 'Explicit verification boundary',
      },
    ],
    limitations: [
      'Locally tested implementation; AWS execution and database integration still require deployment validation.',
      'Current AnalyzeExpense path is synchronous and supports single-page PDFs and supported images; multi-page asynchronous processing is not implemented.',
      'Initial project: July–September 2025. Further development in October 2026 added Step Functions orchestration, human review and Bedrock fallback.',
    ],
    scaleRedesign: [
      'Run deployed integration checks with representative inputs and record dated results.',
      'Monitor failures, retries and operating costs with a defined ownership process.',
    ],
  },
  {
    slug: 'preclear-ai',
    number: '03',
    title: 'Homeowner Permit Compliance Checker',
    shortTitle: 'Permit compliance',
    year: 'Jan–Mar 2026 · Updated Oct 2026',
    role: 'Independent backend builder',
    scope: 'Python, PostgreSQL, FastAPI, JavaScript, Apify, OpenAI',
    evidenceStatus:
      'Implementation added October 2026; local tests, cloud validation pending',
    outcome:
      'Built Python ingestion with Apify, a shared PostgreSQL rule schema, FastAPI project-attribute lookups, and an OpenAI conversational agent that calls database tools and explains retrieved requirements.',
    summary:
      'Built Python ingestion with Apify, a shared PostgreSQL rule schema, FastAPI project-attribute lookups, and an OpenAI conversational agent that calls database tools and explains retrieved requirements.',
    contributionSummary:
      'Added Python and Apify collection with source evidence, normalized rule candidates and reviewed PostgreSQL ingestion. Built FastAPI endpoints that map project attributes to jurisdiction-specific permit rules. Built a conversational OpenAI agent that calls a validated database lookup tool and explains retrieved requirements in plain language.',
    architecture: [
      {
        name: 'Municipal sources',
        detail: 'Apify + Python collection',
      },
      {
        name: 'Review + normalization',
        detail: 'Compound rules and provenance',
      },
      {
        name: 'PostgreSQL',
        detail: 'Jurisdiction-scoped rules',
      },
      {
        name: 'FastAPI',
        detail: 'Validated attribute lookup',
      },
      {
        name: 'OpenAI agent',
        detail: 'Tool calls and explanations',
      },
      {
        name: 'JavaScript interface',
        detail: 'React/Vite Aura conversation',
      },
    ],
    homepageLimitation:
      'Municipal raw documents and chunks are stored in Supabase. Its database-size quota currently blocks verification of the résumé’s 50+ source-site count.',
    links: [
      {
        label: 'Open PreClear',
        href: 'https://www.preclearai.net/',
        kind: 'live',
        note: 'Canonical app: Preclear/Preclear-Astra. Live data and model configuration are pending.',
      },
      {
        label: 'Browse canonical source',
        href: 'https://github.com/Preclear/Preclear-Astra',
        kind: 'source',
      },
    ],
    problem:
      'Homeowners need to connect project details with changing jurisdiction-specific requirements and understand the sources behind the answer.',
    constraints: [
      'Municipal raw documents and chunks are stored in Supabase. Its database-size quota currently blocks verification of the résumé’s 50+ source-site count.',
      'Canonical implementation: Preclear/Preclear-Astra. API and UI preview checks passed; live database and model configuration remain pending.',
      'Initial project: January–March 2026. Further development in October 2026 added FastAPI lookups, Apify ingestion and the conversational agent.',
    ],
    contribution: [
      'Added Python and Apify collection with source evidence, normalized rule candidates and reviewed PostgreSQL ingestion.',
      'Built FastAPI endpoints that map project attributes to jurisdiction-specific permit rules.',
      'Built a conversational OpenAI agent that calls a validated database lookup tool and explains retrieved requirements in plain language.',
    ],
    outsideClaim: [
      'Production adoption, uptime, accuracy or latency guarantees.',
      'Retrospective proof that newly added features existed during the project dates.',
    ],
    decisions: [
      {
        title: 'Preserve conditions and source provenance',
        detail:
          'Normalized rules retain compound conditions, citations, source hashes, review dates and expiry.',
        tradeoff:
          'Source review and refresh are required before rules become queryable.',
      },
      {
        title: 'Keep decisions in the lookup service',
        detail:
          'FastAPI evaluates all applicable reviewed rules; missing inputs and conflicts require jurisdiction verification.',
        tradeoff:
          'Unknown cases remain unresolved instead of receiving a guessed determination.',
      },
      {
        title: 'Constrain agent tools',
        detail:
          'The agent can call one read-only lookup tool, with jurisdiction fixed by the server and bounded tool rounds.',
        tradeoff:
          'The conversation can explain retrieved rules but cannot issue permits or modify the database.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'limited',
        label: 'Implementation and local verification',
        finding:
          'Canonical React/Vite and FastAPI implementation added in October 2026: 24 Python tests, production build, and deployed API authentication checks passed. Live data/provider validation remains pending.',
        method:
          'Local domain, orchestration and API checks; provider responses are mocked.',
        source: 'Repository implementation and test files',
      },
      {
        id: 'E-02',
        status: 'withheld',
        label: 'Deployment and measured outcomes',
        finding:
          'Vercel preview serves the API and interface. No successful live model/database integration, production benchmark or coverage measurement is claimed.',
        method:
          'Verify deployed services and publish dated measurement artifacts before adding outcome claims.',
        source: 'Explicit verification boundary',
      },
    ],
    limitations: [
      'Municipal raw documents and chunks are stored in Supabase. Its database-size quota currently blocks verification of the résumé’s 50+ source-site count.',
      'Canonical implementation: Preclear/Preclear-Astra. API and UI preview checks passed; live database and model configuration remain pending.',
      'Initial project: January–March 2026. Further development in October 2026 added FastAPI lookups, Apify ingestion and the conversational agent.',
    ],
    scaleRedesign: [
      'Run deployed integration checks with representative inputs and record dated results.',
      'Monitor failures, retries and operating costs with a defined ownership process.',
    ],
  },
] as const;

export const otherWork = [
  {
    organization: 'ICATT Consulting',
    work: 'Django ecommerce and accounting applications, FastAPI financial reporting, and EventBridge-scheduled ledger reconciliation',
    stack: 'Django / FastAPI / SQL / Docker / AWS ECS / pytest',
    note: 'Aug 2025–Mar 2026 · Contract software developer',
  },
  {
    organization: 'Cube Money (UMD StartHub)',
    work: 'Flask APIs for Ethiopian Ekub rotating savings: groups, contributions, payouts, late payments, and one seat per phone number',
    stack: 'Flask / SQLAlchemy / PostgreSQL',
    note: 'Jan–Jun 2025 · Software engineer',
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
