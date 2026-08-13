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
    title: 'Distributed Skill Analytics Engine & REST API',
    shortTitle: 'Skill analytics',
    year: '2025',
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
    title: 'Automated Invoice Processing Platform',
    shortTitle: 'Invoice platform',
    year: '2025',
    role: 'Independent cloud/backend builder',
    scope:
      'Serverless orchestration, OCR extraction, persistence, human review',
    evidenceStatus: 'Résumé-aligned scope; public source and demo provided',
    outcome:
      'Built a serverless, event-driven invoice platform that orchestrates asynchronous Textract extraction across Lambda functions, persists normalized fields to PostgreSQL, and routes low-confidence results through human review.',
    summary:
      'AWS Step Functions coordinates asynchronous document extraction, Lambda processing, and PostgreSQL persistence; a Streamlit review interface validates uncertain fields before they are committed.',
    contributionSummary:
      'I built the Step Functions workflow, Lambda and Textract processing path, normalized PostgreSQL persistence layer, Streamlit review interface, and AWS CDK infrastructure.',
    architecture: [
      { name: 'S3', detail: 'Invoice upload event' },
      { name: 'Step Functions', detail: 'Orchestrate workflow' },
      { name: 'Lambda + Textract', detail: 'Extract asynchronously' },
      { name: 'PostgreSQL', detail: 'Persist normalized fields' },
      { name: 'Streamlit', detail: 'Review uncertain fields' },
    ],
    homepageLimitation:
      'Production-scale accuracy, cost, throughput, and long-term workload behavior remain outside the current claim.',
    links: [
      {
        label: 'Watch demo',
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
      'Invoice extraction needs more than OCR: asynchronous work must be coordinated, extracted fields must land in a consistent schema, and uncertain values must be reviewed before they become trusted financial records.',
    constraints: [
      'Document extraction is asynchronous and spans multiple serverless functions.',
      'OCR output can contain low-confidence or incorrect field values.',
      'Every accepted record must conform to a normalized PostgreSQL model.',
      'Cloud resources and workflow wiring need to be reproducible across environments.',
    ],
    contribution: [
      'Built a serverless event-driven pipeline with Step Functions orchestrating asynchronous Textract extraction across Lambda functions.',
      'Persisted normalized invoice fields to PostgreSQL and defined the AWS architecture as Infrastructure as Code with AWS CDK.',
      'Integrated a Streamlit human-in-the-loop review interface for low-confidence extractions.',
      'Ensured unverified field values are validated before database persistence.',
    ],
    outsideClaim: [
      'Universal OCR accuracy across every invoice layout and document quality.',
      'Production adoption, operating cost, throughput, uptime, or service levels.',
      'Final accounting approval or replacement of human financial controls.',
    ],
    decisions: [
      {
        title: 'Orchestrate asynchronous extraction with Step Functions',
        detail:
          'Step Functions coordinates Textract extraction and the Lambda functions that validate, transform, and persist each invoice.',
        tradeoff:
          'Explicit workflow state improves retries and visibility, while adding more infrastructure and state transitions than a single handler.',
      },
      {
        title: 'Normalize before PostgreSQL persistence',
        detail:
          'Extracted fields are transformed into a consistent relational shape before they reach the database.',
        tradeoff:
          'Downstream queries become simpler, but source-specific variation must be resolved or retained as provenance during normalization.',
      },
      {
        title: 'Gate uncertain fields with human review',
        detail:
          'Low-confidence extractions are routed to Streamlit for validation before database persistence.',
        tradeoff:
          'Review protects data quality, but introduces an operator queue and increases completion time for uncertain documents.',
      },
      {
        title: 'Define the stack with AWS CDK',
        detail:
          'The serverless resources, permissions, and workflow connections are expressed as Infrastructure as Code.',
        tradeoff:
          'Deployments become repeatable, while changes must account for CloudFormation lifecycle and environment-specific configuration.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'limited',
        label: 'Architecture scope',
        finding:
          'The current project description covers Step Functions, asynchronous Textract, Lambda, PostgreSQL, Streamlit review, and AWS CDK.',
        method:
          'Aligned the portfolio copy with the updated résumé supplied on August 7, 2026.',
        source: 'Updated résumé and linked public source',
      },
      {
        id: 'E-02',
        status: 'verified',
        label: 'Demonstrated workflow',
        finding:
          'A repository-hosted recording is linked from the project and shows the application workflow.',
        method: 'The portfolio links directly to the repository demo artifact.',
        source: 'Repository demo video',
      },
      {
        id: 'E-03',
        status: 'withheld',
        label: 'Performance and quality outcomes',
        finding:
          'Accuracy, runtime, cost, throughput, and production-scale behavior are not claimed.',
        method:
          'Publish a dated fixture corpus, environment, baseline, sample count, and raw results before adding those claims.',
        source: 'Outside current project evidence',
      },
    ],
    limitations: [
      'OCR quality still depends on document layout and source quality.',
      'Human review requires an explicit queue, ownership model, and response-time target in production.',
      'No dated accuracy, latency, throughput, or cost benchmark is presented here.',
    ],
    scaleRedesign: [
      'Add durable retry, dead-letter, replay, and idempotency controls around every workflow state.',
      'Track field-level confidence and reviewer corrections against a versioned evaluation corpus.',
      'Monitor extraction latency, review backlog, database writes, throughput, and cost per document.',
    ],
  },
  {
    slug: 'preclear-ai',
    number: '03',
    title: 'PreClear Permit Compliance Platform',
    shortTitle: 'PreClear AI',
    year: '2025–present',
    role: 'Independent backend builder',
    scope: 'Municipal ingestion, normalized compliance schema, permit API',
    evidenceStatus: 'Résumé-aligned scope; live product provided',
    outcome:
      'Built modular scraping and ingestion services that normalize requirements from more than 50 municipal sites, then expose jurisdiction-specific permit and compliance rules through FastAPI.',
    summary:
      'Apify and Python collect structurally different municipal requirements into a unified PostgreSQL schema, while FastAPI maps project attributes to the rules for the relevant jurisdiction.',
    contributionSummary:
      'I built the Apify and Python ingestion services, unified PostgreSQL compliance schema, and FastAPI lookup services that replace manual municipal research with a single low-latency request.',
    architecture: [
      { name: 'Municipal sites', detail: '50+ source structures' },
      { name: 'Apify', detail: 'Collect requirements' },
      { name: 'Python ingestion', detail: 'Normalize records' },
      { name: 'PostgreSQL', detail: 'Unified compliance schema' },
      { name: 'FastAPI', detail: 'Map project attributes' },
      { name: 'Permit lookup', detail: 'Return jurisdiction rules' },
    ],
    homepageLimitation:
      'The platform supports municipal research; final requirements should still be verified with the relevant jurisdiction.',
    links: [
      {
        label: 'Open live product',
        href: 'https://www.preclearai.net/',
        kind: 'live',
      },
    ],
    problem:
      'Permit and compliance requirements are spread across municipal sites with different structures and terminology. A project team needs one consistent way to map project attributes to the rules for the correct jurisdiction without repeating manual site-by-site research.',
    constraints: [
      'Each municipal source can use a different page structure, vocabulary, and publishing format.',
      'Requirements need a consistent schema without losing their jurisdiction context.',
      'The request path needs to return only the rules relevant to the submitted project attributes.',
      'Municipal requirements can change and still require source-level verification.',
    ],
    contribution: [
      'Developed modular scraping and ingestion services in Apify and Python.',
      'Normalized compliance requirements from more than 50 structurally different municipal sites into a unified PostgreSQL schema.',
      'Engineered FastAPI services that map project attributes to jurisdiction-specific permit and compliance rules.',
      'Turned a manual municipal research task into a low-latency single-point lookup.',
    ],
    outsideClaim: [
      'Legal or permitting advice, approval authority, or a guarantee of municipal acceptance.',
      'Coverage of every municipality or every possible project configuration.',
      'A replacement for final verification with the responsible jurisdiction.',
    ],
    decisions: [
      {
        title: 'Isolate each source in a modular scraper',
        detail:
          'Apify and Python ingestion modules handle structurally different municipal sites behind a consistent output contract.',
        tradeoff:
          'Source-specific adapters contain variation cleanly, but each site can still require maintenance when its structure changes.',
      },
      {
        title: 'Normalize requirements into PostgreSQL',
        detail:
          'Municipal records converge on one relational schema that preserves jurisdiction and compliance-rule context.',
        tradeoff:
          'A unified model makes lookup predictable, while unusual local rules may require extensible fields or source metadata.',
      },
      {
        title: 'Map explicit project attributes through FastAPI',
        detail:
          'The API accepts project characteristics and resolves the subset of rules that applies to the selected jurisdiction.',
        tradeoff:
          'Structured inputs support low-latency lookup, but the attribute model must evolve as new rule conditions appear.',
      },
      {
        title: 'Keep jurisdiction verification visible',
        detail:
          'The result is positioned as a focused research lookup rather than a final permit determination.',
        tradeoff:
          'Users retain a manual verification step, but the platform avoids presenting changing municipal information as approval authority.',
      },
    ],
    evidence: [
      {
        id: 'E-01',
        status: 'limited',
        label: 'Ingestion scope',
        finding:
          'The current project description reports normalized requirements from more than 50 structurally different municipal sites.',
        method:
          'Aligned the portfolio copy with the updated résumé supplied on August 7, 2026.',
        source: 'Updated résumé',
      },
      {
        id: 'E-02',
        status: 'verified',
        label: 'Live product surface',
        finding:
          'The portfolio links to the live PreClear product for direct inspection.',
        method: 'The live product URL is exposed as the primary project link.',
        source: 'preclearai.net',
      },
      {
        id: 'E-03',
        status: 'withheld',
        label: 'Coverage and accuracy outcomes',
        finding:
          'Complete municipal coverage, legal accuracy, production adoption, and service levels are not claimed.',
        method:
          'Publish a dated coverage manifest, update history, evaluation set, and source-verification process before adding those claims.',
        source: 'Outside current project evidence',
      },
    ],
    limitations: [
      'Municipal site changes can require scraper maintenance and data revalidation.',
      'The 50+ source count does not represent universal municipal coverage.',
      'Lookup results still need final verification with the relevant jurisdiction.',
    ],
    scaleRedesign: [
      'Add per-source freshness monitoring, change detection, and failure alerts.',
      'Version normalized requirements with source timestamps and review status.',
      'Build a jurisdiction-level evaluation set for mapping accuracy, coverage, and API latency.',
    ],
  },
] as const;

export const otherWork = [
  {
    organization: 'ICATT Consulting',
    work: 'Automated data integration, normalized relational schemas, CI/CD validation gates, and real-time reconciliation across three financial systems',
    stack: 'Python / SQL / Relational databases / CI/CD',
    note: '3 systems · processing under 3 hours · 8 hours/week saved',
  },
  {
    organization: 'Cube Money',
    work: 'Python identity resolution, unified data models, and automated consistency checks across distributed account groups',
    stack: 'Python / Data modeling / Data quality',
    note: '3,000+ accounts · 8 systems · 120 groups',
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
