import type { CaseSlug } from './case-studies';

export type SystemStage = {
  id: string;
  name: string;
  role: string;
  input: string;
  process: string;
  output: string;
  example: string;
  failure: string;
  source: string;
};
export type FlowColumn = { label?: string; stages: string[] };
export type SystemExplainerData = {
  story: string;
  example: string;
  status: string;
  lanes: {
    name: string;
    note: string;
    columns: FlowColumn[];
    destination: string;
  }[];
  stages: SystemStage[];
  stack: {
    name: string;
    category: string;
    responsibility: string;
    why: string;
  }[];
  walkthrough: string[];
};
const stage = (
  id: string,
  name: string,
  role: string,
  input: string,
  process: string,
  output: string,
  example: string,
  failure: string,
  source: string,
): SystemStage => ({
  id,
  name,
  role,
  input,
  process,
  output,
  example,
  failure,
  source,
});
const tech = (
  name: string,
  category: string,
  responsibility: string,
  why: string,
) => ({ name, category, responsibility, why });
const col = (...stages: string[]): FlowColumn => ({ stages });

export const systemExplainers: Record<CaseSlug, SystemExplainerData> = {
  'invoice-pipeline': {
    story:
      'Think of this as an invoice intake desk. A document arrives, a reader finds the important fields, and a second reader suggests anything uncertain. A person checks those suggestions before they enter the accounting database. Clear, complete extractions can take the direct route.',
    example:
      'Illustrative invoice: INV-1042 from Cedar Supply, dated 2026-10-01, total $240.00. Suppose the total is difficult to read.',
    status:
      'Locally tested implementation. AWS deployment and live provider validation remain pending; the current path accepts single-page PDFs and supported images.',
    lanes: [
      {
        name: '01 / Read the document',
        note: 'A versioned source becomes an extraction artifact. The workflow passes references, not the whole document.',
        columns: [col('upload'), col('orchestrate'), col('extract')],
        destination: 'Extraction artifact → confidence decision in lane 02',
      },
      {
        name: '02 / Decide what needs a person',
        note: 'The fallback stage calls the model only for missing or low-confidence fields.',
        columns: [
          col('fallback'),
          {
            label: 'Confidence gate · two possible routes',
            stages: ['direct', 'review'],
          },
          col('database'),
        ],
        destination:
          'Both routes reach PostgreSQL only after field validation. Review waits for explicit human approval.',
      },
    ],
    stages: [
      stage(
        'upload',
        'S3 upload',
        'Keep the original',
        'One PDF or supported image.',
        'A private, versioned bucket stores the document. An upload event invokes the starter Lambda.',
        'Bucket, object key and version identify the input.',
        'INV-1042.pdf is saved as a specific object version.',
        'Unsupported extensions are ignored. Version identity prevents a later overwrite from changing this run’s source.',
        'src/lambda_functions/intelligence_handlers.py · starter',
      ),
      stage(
        'orchestrate',
        'Lambda + Step Functions',
        'Coordinate the work',
        'The S3 upload event.',
        'The starter derives a deterministic execution ID. Step Functions runs extraction, fallback and the persistence decision.',
        'A traceable execution with S3 artifact references.',
        'One workflow tracks INV-1042 from upload to saved or pending review.',
        'Repeated events reuse the execution identity. A failed model call is caught and routed to review; extraction errors can still fail the run.',
        'invoice_pipeline/intelligence_stack.py',
      ),
      stage(
        'extract',
        'Textract + Python',
        'Read and normalize',
        'The pinned S3 document.',
        'AnalyzeExpense reads invoice fields and confidence scores. Python normalizes invoice number, vendor, date and amount.',
        'An extraction JSON artifact in private S3.',
        'The vendor is clear, but the $240.00 total has low confidence.',
        'Invalid dates or amounts cannot pass the persistence gate. This synchronous path does not process multi-page PDFs.',
        'src/lambda_functions/intelligence.py · extract',
      ),
      stage(
        'fallback',
        'Amazon Bedrock',
        'Suggest uncertain fields',
        'Only requested uncertain fields plus extracted OCR text.',
        'Converse requests structured suggestions, preserving high-confidence values. Every model-derived field requires human review.',
        'A candidate record and a ready/not-ready decision.',
        'The model may suggest 240.00; it does not make that value trusted.',
        'Invalid JSON, incomplete output or provider failure routes the record to review. Text absent from OCR cannot be recovered reliably.',
        'src/lambda_functions/intelligence_handlers.py · fallback',
      ),
      stage(
        'direct',
        'Complete + confident',
        'Automatic route',
        'All required fields are valid and sufficiently confident.',
        'The validation gate permits the persistence Lambda to save without a review task.',
        'A validated record for PostgreSQL.',
        'If every INV-1042 field were clear, this route would save it directly.',
        'Any missing, uncertain or model-derived field blocks the automatic path.',
        'src/lambda_functions/intelligence.py · can_persist',
      ),
      stage(
        'review',
        'S3 → Streamlit review',
        'Human approval route',
        'A candidate held in pending-review/ with a link to its original.',
        'An authenticated reviewer compares the document, edits values and explicitly confirms before saving.',
        'Human-verified invoice fields.',
        'The reviewer reads the original and confirms the total is $240.00.',
        'Unapproved candidates stay outside the invoice table. Review adds a human dependency and completion time.',
        'src/web_portal/pages/03_Extraction_Review.py',
      ),
      stage(
        'database',
        'PostgreSQL',
        'Store trusted fields',
        'Validated automatic or human-approved fields.',
        'Parameterized SQL stores normalized values. A unique extraction ID makes repeated saves idempotent.',
        'One invoice row for the extraction.',
        'INV-1042, Cedar Supply, 2026-10-01 and 240.00 become queryable.',
        'TLS connectivity and credentials must be configured. A database failure is not a successful save.',
        'database/migrations/001_intelligence.sql · intelligence.py / persist',
      ),
    ],
    stack: [
      tech(
        'Python',
        'Language',
        'Normalization, validation, workflow handlers and persistence.',
        'One language connects OCR results, business rules and database writes.',
      ),
      tech(
        'Amazon S3',
        'Object storage',
        'Originals, extraction artifacts and pending review records.',
        'Keeps documents and unapproved candidates separate from accounting rows.',
      ),
      tech(
        'AWS Lambda',
        'Compute',
        'Starts workflows and runs individual processing stages.',
        'Each stage runs on an event without a continuously running application server.',
      ),
      tech(
        'AWS Step Functions',
        'Orchestration',
        'Sequences stages and branches at the review gate.',
        'Makes the workflow and failure transitions explicit.',
      ),
      tech(
        'Amazon Textract',
        'Document extraction',
        'AnalyzeExpense supplies fields, OCR text and confidence.',
        'Provides invoice-aware extraction before using a general language model.',
      ),
      tech(
        'Amazon Bedrock',
        'Model service',
        'Converse suggests missing or uncertain values from OCR text.',
        'Adds a bounded fallback while keeping suggestions reviewable.',
      ),
      tech(
        'Streamlit',
        'Review interface',
        'Displays candidates, originals and editable fields.',
        'Makes an internal Python review workflow practical without a separate frontend.',
      ),
      tech(
        'PostgreSQL',
        'Relational database',
        'Stores normalized, validated invoice records.',
        'Typed fields, constraints and unique extraction IDs support reliable writes.',
      ),
      tech(
        'AWS CDK',
        'Infrastructure as code',
        'Defines the bucket, functions, workflow and permissions.',
        'Makes the infrastructure reproducible and reviewable alongside application code.',
      ),
      tech(
        'Secrets Manager + IAM',
        'Access control',
        'Supplies the database secret to persistence and scopes AWS access.',
        'Keeps database credentials out of source code and limits service permissions.',
      ),
    ],
    walkthrough: [
      'I start with the trust boundary: uploading a document is not the same as accepting its values.',
      'S3 triggers a Step Functions workflow. Textract reads it; Python normalizes the fields; Bedrock only fills uncertain gaps.',
      'The confidence gate has two exits. Complete, confident fields can save directly. Every model suggestion goes through Streamlit review.',
      'I use a unique extraction ID to prevent duplicate saves. The next validation step is a deployed end-to-end run with representative documents.',
    ],
  },
  'preclear-ai': {
    story:
      'Think of this as a research assistant with a checked rulebook. First, municipal documents are collected and a person reviews the extracted rules. Then a homeowner asks a question. The assistant looks up the rules for the selected location and explains the result with sources.',
    example:
      'Illustrative question: “Do I need a permit for a 120-square-foot shed?” The homeowner selects a jurisdiction; no permit determination below is a real municipal answer.',
    status:
      'Canonical app: Preclear/Preclear-Astra. UI and API code are deployed; auth, database and model configuration still prevent a verified live answer. The 50+ source-site figure is not verified.',
    lanes: [
      {
        name: '01 / Prepare the rulebook',
        note: 'Ingestion is separate from the homeowner’s request. Existing Supabase documents can be reused.',
        columns: [
          { label: 'Alternative source inputs', stages: ['crawl', 'existing'] },
          col('candidates'),
          col('approved'),
        ],
        destination:
          'Reviewed rules → PostgreSQL → available to the lookup in lane 02',
      },
      {
        name: '02 / Answer a question',
        note: 'The model translates the question; application code evaluates the rules.',
        columns: [col('question'), col('auth'), col('agent'), col('lookup')],
        destination:
          'Tool result → back to OpenAI for explanation → response routes in lane 03',
      },
      {
        name: '03 / Return an honest result',
        note: 'The model receives the tool result and explains it; it cannot approve a permit.',
        columns: [
          {
            label: 'Lookup outcome · two possible routes',
            stages: ['response', 'unknown'],
          },
        ],
        destination:
          'Plain-language response and retrieved source links → homeowner interface',
      },
    ],
    stages: [
      stage(
        'crawl',
        'Apify + Python',
        'Collect municipal pages',
        'An explicit manifest of municipal source URLs.',
        'The crawler collects page text; Python preserves source URL, jurisdiction and retrieval metadata.',
        'Source text for candidate extraction.',
        'A selected town’s shed guidance enters the ingestion workflow.',
        'Cross-site redirects need review. Collection is bounded; successful crawling is not proof of statewide coverage.',
        'municipal/pipeline.py · crawl',
      ),
      stage(
        'existing',
        'Supabase documents',
        'Reuse collected evidence',
        'Existing raw_documents and linked ordinance_chunks.',
        'A paginated export reads stored source material without recrawling it.',
        'Source text with provenance for the same extraction path.',
        'An already stored shed ordinance can be reused instead of fetched again.',
        'Quota or export failures stop processing; inaccessible data is not counted as zero sources.',
        'municipal/supabase_export.py',
      ),
      stage(
        'candidates',
        'OpenAI + validation',
        'Draft structured rules',
        'Municipal text and source metadata.',
        'The model proposes conditions, requirements and citations. Python checks types and verifies supporting quotes occur in the source.',
        'Unapproved rule candidates with source hashes.',
        'A source may describe a shed size threshold and other conditions; both must be preserved.',
        'Ambiguous rules are omitted; invented quotes fail validation. Extraction alone never approves a rule.',
        'municipal/pipeline.py · extract_candidates / normalize',
      ),
      stage(
        'approved',
        'Human review → PostgreSQL',
        'Publish the rulebook',
        'Candidates checked against the original municipal text.',
        'An importer requires reviewer and expiry information and transactionally imports normalized rules with provenance.',
        'Reviewed, jurisdiction-scoped compliance_rules.',
        'A reviewer checks the complete shed exemption before publishing it.',
        'Unreviewed or expired rules are excluded from decisions. A failed transaction must not partially replace a source.',
        'municipal/pipeline.py · import_reviewed',
      ),
      stage(
        'question',
        'React interface',
        'Capture the question',
        'A signed-in homeowner, jurisdiction and project question.',
        'The Vite-built React interface sends a same-origin request with the Supabase session token.',
        'A typed question payload for /api/chat.',
        '“120-square-foot shed” travels with the selected jurisdiction.',
        'Missing project details may need follow-up. The interface does not determine permit status itself.',
        'src/app/PermitAssistant.tsx · backend/web.py',
      ),
      stage(
        'auth',
        'FastAPI + Supabase auth',
        'Verify access',
        'Bearer token and validated request body.',
        'The Vercel Python function checks the session against Supabase before model or database access.',
        'An authenticated request to the service.',
        'The session is verified before looking up shed rules.',
        'Missing/invalid sessions return 401; missing settings or unavailable authentication return 503.',
        'backend/web.py · authorize',
      ),
      stage(
        'agent',
        'OpenAI tool loop',
        'Translate into a lookup',
        'The question, conversation history and selected jurisdiction.',
        'The model requests the read-only lookup_permit_rules tool. Python validates its arguments and pins the jurisdiction server-side.',
        'Structured project type and attributes for the lookup.',
        'The question may become project_type shed plus area 120; unstated dimensions must not be invented.',
        'The loop is bounded to four rounds. Unsupported tools and invalid arguments are rejected; no lookup means a request for details.',
        'backend/agent.py · answer',
      ),
      stage(
        'lookup',
        'Python rules + PostgreSQL',
        'Evaluate conditions',
        'Project attributes and jurisdiction-scoped reviewed rules.',
        'Parameterized reads retrieve rules. Python evaluates compound conditions, review dates and expiry; the result returns to the agent.',
        'Status, missing attributes, matched rules and source URLs.',
        'Area is compared with actual reviewed conditions; other required attributes may still be missing.',
        'Absent, expired or conflicting rules cannot support a definitive answer. Database errors return a service error.',
        'backend/repository.py · backend/rules.py',
      ),
      stage(
        'response',
        'Sourced explanation',
        'Supported result route',
        'A consistent lookup result with applicable reviewed rules.',
        'The model explains retrieved requirements in plain language and cites returned URLs; the UI also receives structured lookups.',
        'A research answer with inspectable evidence.',
        'A real answer would name the retrieved requirement and its municipal source.',
        'A supported research result is not permit approval. Current requirements still need jurisdiction confirmation.',
        'backend/agent.py · INSTRUCTIONS',
      ),
      stage(
        'unknown',
        'Verify with jurisdiction',
        'Uncertain result route',
        'Missing attributes, no current rules, or contradictory results.',
        'The service returns VERIFY_WITH_JURISDICTION and any missing fields rather than making up a determination.',
        'A request for details or municipal verification.',
        'If shed height is needed but unknown, the system cannot conclude from area alone.',
        'Provider failures return an error, not a fabricated permit answer.',
        'backend/rules.py · evaluate',
      ),
    ],
    stack: [
      tech(
        'React + TypeScript',
        'Browser interface',
        'Question entry, jurisdiction selection, conversation and source display.',
        'Components organize the interface; types describe data exchanged with the API.',
      ),
      tech(
        'Vite',
        'Frontend build tool',
        'Develops and bundles the React/JavaScript application.',
        'Produces the static frontend served with the API deployment.',
      ),
      tech(
        'Python + FastAPI',
        'Application service',
        'Validates requests, verifies sessions and exposes chat and deterministic lookup endpoints.',
        'Keeps business rules and ingestion in Python with explicit API contracts.',
      ),
      tech(
        'Apify',
        'Collection service',
        'Collects specified municipal pages for ingestion.',
        'Separates page acquisition from rule extraction and review.',
      ),
      tech(
        'OpenAI',
        'Language model API',
        'Drafts ingestion candidates and interprets homeowner questions using read-only tools.',
        'Handles varied wording while decisions remain in the rule evaluator.',
      ),
      tech(
        'PostgreSQL / Supabase',
        'Data + authentication',
        'Stores raw documents, chunks and reviewed rules; verifies homeowner sessions.',
        'A relational schema preserves jurisdiction, conditions and source provenance.',
      ),
      tech(
        'Vercel',
        'Hosting',
        'Serves the React app and same-origin FastAPI Python function.',
        'Keeps browser and API under one origin; hosting alone does not configure model or data access.',
      ),
    ],
    walkthrough: [
      'I separate building the rulebook from answering a homeowner. Crawled or existing documents become candidates, then a human reviews them.',
      'For a question, the UI sends a jurisdiction and authenticated request. OpenAI turns everyday wording into a constrained lookup tool call.',
      'Python evaluates reviewed PostgreSQL rules. The model explains that result and cites its sources; it cannot change the jurisdiction or write to the database.',
      'The most important design choice is how we handle uncertainty: missing details or conflicting rules mean municipal verification, not a guessed answer.',
    ],
  },
  'tech-skill-demand-platform': {
    story:
      'Think of this as organizing a messy stack of job advertisements into a searchable skills index. A background worker cleans repeated postings and links different phrases to the same skill. The API then answers filtered questions from that prepared data, reusing cached answers when possible.',
    example:
      'Illustrative query: “Which skills appear in data engineer jobs in Maryland?” Example postings mention Python, SQL and a repeated advertisement; these are walkthrough inputs, not measured market findings.',
    status:
      'Validated locally on a 200,000-record real-posting sample. Warm-cache timings are development measurements, not production guarantees. AWS execution adapters are implemented but deployment is not verified.',
    lanes: [
      {
        name: '01 / Submit background work',
        note: 'The API accepts a run and returns 202. The client can poll its status without waiting for Spark.',
        columns: [col('submit'), col('queue'), col('worker')],
        destination:
          'Worker → Spark processing in lane 02; PostgreSQL remains the durable run-status record',
      },
      {
        name: '02 / Build the searchable index',
        note: 'This batch path is separate from an analytics read request.',
        columns: [col('spark'), col('skills'), col('publish')],
        destination:
          'Committed postings + skills → query tables; invalidate demand cache after commit',
      },
      {
        name: '03 / Serve a filtered question',
        note: 'Cache-aside: check the fast copy first, read the database only when needed.',
        columns: [
          col('query'),
          {
            label: 'Redis lookup · two possible routes',
            stages: ['hit', 'miss'],
          },
          col('result'),
        ],
        destination: 'JSON aggregation response → API consumer',
      },
    ],
    stages: [
      stage(
        'submit',
        'FastAPI run endpoint',
        'Accept a processing job',
        'Input URI, output URI and execution mode.',
        'POST /v1/runs validates arguments and persists a queued PostgreSQL run record.',
        '202 Accepted with a run UUID.',
        'A file of job ads receives a tracking ID before processing begins.',
        'Acceptance is not completion. Clients poll the durable record to learn whether processing succeeded or failed.',
        'src/skill_analytics/api/routes/runs.py',
      ),
      stage(
        'queue',
        'Redis work queue',
        'Hand work to the worker',
        'Run UUID and immutable processing arguments.',
        'A compact message enters a Redis list; the worker consumes it with BRPOP.',
        'A job message outside the HTTP request lifecycle.',
        'The ad-cleaning job waits in line while the API can accept other requests.',
        'Redis carries work but is not the durable run ledger. Automatic retry and dead-letter handling are not implemented.',
        'src/skill_analytics/cache.py',
      ),
      stage(
        'worker',
        'Async Python worker',
        'Own the job lifecycle',
        'One consumed run message.',
        'The worker marks the run active and starts local Spark or the EMR Serverless execution adapter.',
        'A separately tracked processing lifecycle.',
        'Cleaning starts in a worker rather than inside the web request.',
        'A failed job records terminal failure details; the AWS adapter does not prove deployed execution.',
        'src/skill_analytics/worker.py',
      ),
      stage(
        'spark',
        'PySpark pipeline',
        'Clean and deduplicate',
        'CSV, JSON or Parquet job records.',
        'Canonicalizes fields, classifies exact and bounded near-match reposts, and repartitions on company, title and location.',
        'Canonical postings and partition measurements.',
        'Two copies of the same ad can become one canonical posting.',
        'Duplicate rules have boundaries. This sample flagged 25,639 candidates (12.82%); country-only locations can conflate distinct openings. This is not a market-wide duplicate percentage.',
        'src/skill_analytics/spark/pipeline.py',
      ),
      stage(
        'skills',
        'Versioned taxonomy',
        'Connect words to skills',
        'Canonical descriptions and alias-to-skill mappings.',
        'Spark generates 1–4-word sequences and joins them to a broadcast taxonomy.',
        'Normalized posting-to-skill relationships and output artifacts.',
        'A known alias maps to a canonical skill rather than becoming a new label.',
        'Unlisted aliases can be missed. Taxonomy size is different from the number of distinct skills observed in a run.',
        'src/skill_analytics/spark/taxonomy.py',
      ),
      stage(
        'publish',
        'PostgreSQL publisher',
        'Commit queryable data',
        'Canonical postings, skills, relationships and run metrics.',
        'Deterministic IDs and ON CONFLICT upserts publish transactionally. Cache invalidation follows the database commit.',
        'Normalized query tables and succeeded run status.',
        'The cleaned posting and its Python relationship become available together.',
        'Invalidating before commit could let a reader cache old data again. Failed publication must not be reported as success.',
        'src/skill_analytics/publisher.py',
      ),
      stage(
        'query',
        'FastAPI metrics',
        'Normalize the filters',
        'Skill, role, location and date filters.',
        'Canonical filters produce a stable cache key, then Redis is checked.',
        'Either a cached payload or a database query path.',
        'Equivalent Maryland/data-engineer filters address the same cached query.',
        'A query does not launch Spark. Results depend on the most recently published batch.',
        'src/skill_analytics/api/routes/metrics.py',
      ),
      stage(
        'hit',
        'Redis cache hit',
        'Reuse an answer',
        'A matching unexpired cache key.',
        'The API returns the stored aggregation without querying PostgreSQL.',
        'Cached JSON payload.',
        'A repeated filter combination can use its previous answer.',
        'Cached results need expiry and post-publication invalidation. Warm-hit timings do not measure cold queries.',
        'src/skill_analytics/cache.py',
      ),
      stage(
        'miss',
        'PostgreSQL → cache',
        'Compute an answer',
        'Filters with no matching cached response.',
        'Indexed PostgreSQL aggregations compute the response, which is stored in Redis with a TTL.',
        'Freshly computed aggregation and a reusable cache entry.',
        'The first Maryland query reads the prepared posting-to-skill tables.',
        'Cold query latency depends on data and indexes; it is not established by the warm-cache benchmark.',
        'src/skill_analytics/repository.py',
      ),
      stage(
        'result',
        'Analytics response',
        'Return structured findings',
        'The hit or miss path’s aggregation.',
        'FastAPI returns the result for the requested filters.',
        'A JSON response for an API consumer.',
        'The response describes skills in the available dataset, not all hiring activity.',
        'Empty filters/results are not evidence that no jobs exist in the market. Data coverage limits interpretation.',
        'src/skill_analytics/api/routes/metrics.py',
      ),
    ],
    stack: [
      tech(
        'Python',
        'Language + worker',
        'Coordinates asynchronous jobs and publication.',
        'Keeps processing orchestration separate from API request latency.',
      ),
      tech(
        'PySpark',
        'Batch processing',
        'Normalizes, deduplicates, repartitions and extracts skills.',
        'Expresses distributed joins and transformations, with extra runtime and memory complexity.',
      ),
      tech(
        'FastAPI',
        'API framework',
        'Accepts runs, exposes status and serves filtered aggregations.',
        'Provides explicit validated boundaries for both background work and reads.',
      ),
      tech(
        'PostgreSQL',
        'Relational database',
        'Stores durable run state, postings, skills and relationships.',
        'Transactions, upserts and indexes support repeatable publication and filtered queries.',
      ),
      tech(
        'Redis',
        'Queue + cache',
        'Carries work messages and caches demand-query responses.',
        'Decouples workers and accelerates repeated reads; durable state stays in PostgreSQL.',
      ),
      tech(
        'Docker',
        'Runtime packaging',
        'Runs separate API and Java/PySpark worker images.',
        'Makes the service topology repeatable locally and in CI.',
      ),
      tech(
        'GitHub Actions',
        'Continuous integration',
        'Runs unit, Spark contract, integration and image-build checks.',
        'Checks the boundaries together when code changes.',
      ),
      tech(
        'EMR Serverless adapter',
        'Optional AWS execution',
        'Submits and polls managed Spark jobs.',
        'Allows a cloud execution path; the implemented adapter is not a verified deployment.',
      ),
    ],
    walkthrough: [
      'I separate the write-heavy batch system from the read-heavy API. A run gets a durable ID, enters Redis, and is processed by a worker.',
      'PySpark cleans postings, detects reposts and maps aliases to skills. The publisher commits normalized tables before invalidating cached results.',
      'For a query, FastAPI checks Redis. A hit returns immediately; a miss queries indexed PostgreSQL tables and caches the response.',
      'I can explain the frozen real-posting sample and warm-cache measurements, but I would need repeated larger runs and production telemetry before claiming scale or a service guarantee.',
    ],
  },
};
