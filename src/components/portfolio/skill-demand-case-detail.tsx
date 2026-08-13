const repositoryBase =
  'https://github.com/Daniel21b/Job-Market-Analytics/blob/main';

const sectionLinks = [
  ['01', 'Problem', '#problem'],
  ['02', 'Contribution', '#contribution'],
  ['03', 'System map', '#system-map'],
  ['04', 'Walkthrough', '#walkthrough'],
  ['05', 'Decisions', '#decisions'],
  ['06', 'Evidence', '#evidence'],
  ['07', 'Limits', '#limits'],
  ['08', 'Code map', '#code-map'],
] as const;

const executionLanes = [
  {
    id: 'control-plane',
    label: 'Lane 01 · control plane',
    name: 'Asynchronous run submission',
    input: 'POST /v1/runs · input URI + output URI + mode',
    state: 'code',
    steps: [
      {
        name: 'FastAPI',
        detail: 'Validates the request and returns 202 with a run UUID.',
        state: 'code',
      },
      {
        name: 'PostgreSQL run record',
        detail: 'Persists queued, running, succeeded, or failed state.',
        state: 'artifact',
      },
    ],
    output:
      'Durable status boundary · the request path does not block on a Spark lifecycle.',
  },
  {
    id: 'data-plane',
    label: 'Lane 02 · data plane',
    name: 'Queued distributed processing',
    input: 'Redis list message · run UUID + immutable processing arguments',
    state: 'code',
    steps: [
      {
        name: 'Async Python worker',
        detail: 'Consumes with BRPOP and owns the blocking job lifecycle.',
        state: 'code',
      },
      {
        name: 'PySpark 3.5',
        detail:
          'Canonicalizes, deduplicates, repartitions, and extracts skills.',
        state: 'code',
      },
    ],
    output:
      'Curated boundary · Parquet, publication JSON, and dated pipeline metrics are written before database publication.',
  },
] as const;

const contractSteps = [
  {
    label: 'Canonicalize',
    detail: 'Normalize source fields, text, locations, roles, and timestamps.',
    result: '4,137 input rows reconciled',
    state: 'code',
  },
  {
    label: 'Classify reposts',
    detail:
      'Apply source-redelivery, exact-content, and bounded near-match rules.',
    result: '2 decisions · 4,135 retained',
    state: 'artifact',
  },
  {
    label: 'Repartition',
    detail: 'Hash company, title, and location into a composite join key.',
    result: 'skew 1.644 before · 1.060 after',
    state: 'artifact',
  },
  {
    label: 'Extract + publish',
    detail: 'Join 1–4-grams to a versioned taxonomy and upsert atomically.',
    result: '2,164 matches · 65 skills',
    state: 'artifact',
  },
] as const;

const walkthrough = [
  {
    title: 'Accept and persist a processing run',
    input: 'An input URI, output URI, and optimized execution flag.',
    transformation:
      'FastAPI validates the payload, inserts a queued processing_runs row, and pushes a compact message to Redis.',
    output: '202 Accepted with a UUID that can be polled independently.',
    path: 'src/skill_analytics/api/routes/runs.py · services.py · repository.py',
    failure:
      'PostgreSQL is the durable status source; Redis carries the work message but is not treated as the run ledger.',
  },
  {
    title: 'Move Spark outside the request path',
    input: 'A run message consumed from the Redis queue with BRPOP.',
    transformation:
      'The asynchronous worker marks the run active and starts either the local Spark job or the EMR Serverless adapter.',
    output: 'An isolated processing lifecycle with bounded failure details.',
    path: 'src/skill_analytics/worker.py · aws/emr_serverless.py',
    failure:
      'Failed work is recorded as terminal, but automatic retry and dead-letter handling are not implemented yet.',
  },
  {
    title: 'Canonicalize, deduplicate, and measure skew',
    input: 'CSV, JSON, or Parquet records with source-specific schemas.',
    transformation:
      'PySpark normalizes the canonical fields, classifies source redeliveries and reposts, and repartitions on a composite key while capturing partition profiles.',
    output:
      'The validated fixture moved from 4,137 inputs to 4,135 canonical rows with two duplicate decisions; the optimized local run took 17.627 seconds.',
    path: 'src/skill_analytics/spark/pipeline.py · normalization.py · job.py',
    failure:
      'One optimized run is not a speedup study; the former 40-to-12-minute claim remains withheld without repeated same-input baselines.',
  },
  {
    title: 'Extract normalized skill relationships',
    input: 'Canonical descriptions plus a versioned alias-to-skill taxonomy.',
    transformation:
      'Spark tokenizes descriptions, generates 1–4-grams, broadcasts the taxonomy, and joins normalized aliases to canonical skills.',
    output:
      '2,164 posting-to-skill matches across 65 distinct canonical skills.',
    path: 'src/skill_analytics/spark/taxonomy.py · config/skill_taxonomy.csv',
    failure:
      'This run does not support a claim of 500+ matched skills; taxonomy size and observed distinct matches are different measures.',
  },
  {
    title: 'Publish transactionally and invalidate safely',
    input:
      'Canonical postings, normalized skills, bridge rows, and run metrics.',
    transformation:
      'The publisher derives deterministic posting UUIDs, uses PostgreSQL ON CONFLICT upserts, commits, then invalidates skill-demand cache keys.',
    output:
      'Idempotent query tables plus a succeeded run record and metrics payload.',
    path: 'src/skill_analytics/publisher.py · db/migrations/001_initial.sql',
    failure:
      'Cache invalidation must follow the database commit or readers could repopulate cache entries from stale tables.',
  },
  {
    title: 'Serve indexed aggregations through cache-aside reads',
    input: 'Skill, role, location, and date filters.',
    transformation:
      'FastAPI hashes canonical filters, checks Redis, and queries indexed PostgreSQL aggregations only on a miss.',
    output:
      'A populated local benchmark measured 100 of 100 warm hits at 0.898ms p50, 1.989ms p95, and 4.013ms maximum.',
    path: 'src/skill_analytics/api/routes/metrics.py · cache.py · repository.py',
    failure:
      'The result is a development-scale warm-cache benchmark, not a production SLA or cold-query measurement.',
  },
] as const;

const implementationMap = [
  {
    boundary: 'API lifecycle',
    path: 'src/skill_analytics/main.py · api/routes/',
    href: `${repositoryBase}/src/skill_analytics/main.py`,
    responsibility:
      'Builds the FastAPI service and exposes health, run, status, and metrics endpoints.',
    proof: 'Public implementation + contract tests',
  },
  {
    boundary: 'Queue and cache',
    path: 'src/skill_analytics/cache.py',
    href: `${repositoryBase}/src/skill_analytics/cache.py`,
    responsibility:
      'Owns the Redis run queue, canonical cache keys, TTL reads, and post-publish invalidation.',
    proof: 'Public implementation + unit tests',
  },
  {
    boundary: 'Worker lifecycle',
    path: 'src/skill_analytics/worker.py',
    href: `${repositoryBase}/src/skill_analytics/worker.py`,
    responsibility:
      'Consumes run messages, executes Spark, publishes results, and records terminal status.',
    proof: 'Public implementation + integration test',
  },
  {
    boundary: 'Spark pipeline',
    path: 'src/skill_analytics/spark/pipeline.py',
    href: `${repositoryBase}/src/skill_analytics/spark/pipeline.py`,
    responsibility:
      'Canonicalizes postings, classifies reposts, profiles partitions, and repartitions on the composite key.',
    proof: 'Public implementation + 4 contract tests',
  },
  {
    boundary: 'Skill taxonomy',
    path: 'src/skill_analytics/spark/taxonomy.py · config/skill_taxonomy.csv',
    href: `${repositoryBase}/src/skill_analytics/spark/taxonomy.py`,
    responsibility:
      'Loads normalized aliases and joins posting n-grams to canonical skills.',
    proof: '2,164 matches · 65 observed skills',
  },
  {
    boundary: 'Publication and schema',
    path: 'src/skill_analytics/publisher.py · db/migrations/001_initial.sql',
    href: `${repositoryBase}/src/skill_analytics/publisher.py`,
    responsibility:
      'Publishes deterministic posting, skill, and bridge records with idempotent upserts and query indexes.',
    proof: 'PostgreSQL/Redis integration passed',
  },
  {
    boundary: 'Container topology',
    path: 'docker-compose.yml · docker/',
    href: `${repositoryBase}/docker-compose.yml`,
    responsibility:
      'Runs separate non-root API and Java/PySpark worker images with healthy PostgreSQL and Redis dependencies.',
    proof: 'Both images built locally and in CI',
  },
  {
    boundary: 'AWS execution adapter',
    path: 'src/skill_analytics/aws/emr_serverless.py · infra/aws/',
    href: `${repositoryBase}/src/skill_analytics/aws/emr_serverless.py`,
    responsibility:
      'Submits and polls EMR Serverless jobs and documents the ECS, RDS, ElastiCache, S3, and IAM contract.',
    proof: 'Adapter + contract · deployment withheld',
  },
  {
    boundary: 'Validation evidence',
    path: 'docs/LOCAL_VALIDATION.md · benchmarks/',
    href: `${repositoryBase}/docs/LOCAL_VALIDATION.md`,
    responsibility:
      'Records the dated local run, reconciliation counts, partition profiles, cache latency, and explicit claim boundaries.',
    proof: 'Validated August 7, 2026',
  },
] as const;

function FlowNode({
  name,
  detail,
  state,
}: {
  name: string;
  detail: string;
  state: 'code' | 'artifact' | 'surface' | 'risk';
}) {
  return (
    <article className="skill-demand-map__node" data-state={state}>
      <span>
        {
          {
            code: 'Repository-backed',
            artifact: 'Measured artifact',
            surface: 'Published surface',
            risk: 'Evidence boundary',
          }[state]
        }
      </span>
      <strong>{name}</strong>
      <p>{detail}</p>
    </article>
  );
}

export function SkillDemandSectionIndex() {
  return (
    <nav className="case-index" aria-label="Skill demand case study sections">
      <span className="case-index__label">Case index</span>
      <ol>
        {sectionLinks.map(([number, label, href]) => (
          <li key={href}>
            <a href={href}>
              <span>{number}</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SkillDemandArchitectureMap() {
  return (
    <figure
      className="skill-demand-map"
      aria-labelledby="skill-demand-map-caption">
      <figcaption id="skill-demand-map-caption">
        An asynchronous control plane feeds a measured Spark data plane. Durable
        run state, transactional publication, and cache invalidation keep each
        boundary inspectable without treating a local benchmark as production
        proof.
      </figcaption>

      <div
        className="skill-demand-map__legend"
        aria-label="Architecture evidence legend">
        <span>
          <i data-key="code" /> Repository-backed implementation
        </span>
        <span>
          <i data-key="artifact" /> Measured artifact
        </span>
        <span>
          <i data-key="surface" /> Published surface
        </span>
        <span>
          <i data-key="risk" /> Evidence boundary
        </span>
      </div>

      <section
        className="skill-demand-map__band skill-demand-map__band--acquisition"
        aria-labelledby="acquisition-band-title">
        <header>
          <span>Band A</span>
          <h3 id="acquisition-band-title">Ingress + execution</h3>
          <p>Two planes · one durable run identity</p>
        </header>
        <div className="skill-demand-map__lanes">
          {executionLanes.map((lane) => (
            <article className="skill-demand-map__lane" key={lane.id}>
              <header>
                <span>{lane.label}</span>
                <h4>{lane.name}</h4>
                <p>{lane.input}</p>
              </header>
              <div>
                {lane.steps.map((step, index) => (
                  <div className="skill-demand-map__flow" key={step.name}>
                    <FlowNode {...step} />
                    {index < lane.steps.length - 1 ? (
                      <span aria-hidden="true">→</span>
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="skill-demand-map__risk">{lane.output}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="skill-demand-map__handoff" aria-hidden="true">
        <span>versioned input + run UUID</span>
      </div>

      <section
        className="skill-demand-map__band skill-demand-map__band--contract"
        aria-labelledby="contract-band-title">
        <header>
          <span>Band B</span>
          <h3 id="contract-band-title">Spark data contract</h3>
          <p>Normalize, classify, balance, and match before counting</p>
        </header>
        <ol>
          {contractSteps.map((step, index) => (
            <li key={step.label}>
              <FlowNode
                name={step.label}
                detail={`${step.detail} ${step.result}.`}
                state={step.state}
              />
              {index < contractSteps.length - 1 ? (
                <span aria-hidden="true">→</span>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="skill-demand-map__artifact-note">
          <strong>Validated invariant · August 7, 2026</strong>
          <span>
            4,137 input rows · 4,135 canonical postings · 2 duplicate decisions
            · 2,164 matches · 65 skills
          </span>
        </p>
      </section>

      <div className="skill-demand-map__handoff" aria-hidden="true">
        <span>commit, then invalidate</span>
      </div>

      <section
        className="skill-demand-map__band skill-demand-map__band--interpretation"
        aria-labelledby="interpretation-band-title">
        <header>
          <span>Band C</span>
          <h3 id="interpretation-band-title">Query path</h3>
          <p>Indexed persistence behind canonical cache keys</p>
        </header>
        <div>
          <FlowNode
            name="PostgreSQL fact + dimensions"
            detail="Deterministic UUIDs, idempotent upserts, a posting-to-skill bridge, and composite filter indexes."
            state="code"
          />
          <FlowNode
            name="Redis cache-aside metrics"
            detail="Canonical SHA-256 filter keys; 100/100 local warm hits measured at 1.989ms p95."
            state="artifact"
          />
        </div>
      </section>

      <div className="skill-demand-map__handoff" aria-hidden="true">
        <span>dated evidence</span>
      </div>

      <section
        className="skill-demand-map__band skill-demand-map__band--proof"
        aria-labelledby="proof-band-title">
        <header>
          <span>Band D</span>
          <h3 id="proof-band-title">Proof surfaces</h3>
          <p>Code, tests, and explicit claim boundaries</p>
        </header>
        <div>
          <FlowNode
            name="Local validation record"
            detail="Pins environment, counts, duration, partition profiles, latency distribution, and the claims these results do not support."
            state="artifact"
          />
          <FlowNode
            name="GitHub Actions"
            detail="Runs lint, unit, Spark contract, PostgreSQL/Redis integration, and API/worker image-build checks."
            state="surface"
          />
          <FlowNode
            name="Production scale"
            detail="120K rows, 18% duplicates, 500+ skills, a 40→12 minute speedup, and cloud service levels remain withheld."
            state="risk"
          />
        </div>
      </section>
    </figure>
  );
}

export function SkillDemandBoundaryWalkthrough() {
  return (
    <section
      className="case-section"
      id="walkthrough"
      aria-labelledby="walkthrough-title">
      <div className="case-section__label">
        <span>04</span>
        <h2 id="walkthrough-title">Boundary walkthrough</h2>
      </div>
      <p className="section-intro">
        Six handoffs connect an accepted API request to cached analytics. Each
        row names the payload, transformation, repository owner, and the point
        where the evidence must stop.
      </p>
      <ol className="boundary-walkthrough">
        {walkthrough.map((item, index) => (
          <li key={item.title}>
            <div className="boundary-walkthrough__heading">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
            </div>
            <dl>
              <div>
                <dt>Input</dt>
                <dd>{item.input}</dd>
              </div>
              <div>
                <dt>Transformation</dt>
                <dd>{item.transformation}</dd>
              </div>
              <div>
                <dt>Output</dt>
                <dd>{item.output}</dd>
              </div>
              <div>
                <dt>Failure / credibility boundary</dt>
                <dd>{item.failure}</dd>
              </div>
            </dl>
            <p>
              <span>Public repository path</span>
              <code>{item.path}</code>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SkillDemandImplementationMap() {
  return (
    <section
      className="case-section"
      id="code-map"
      aria-labelledby="code-map-title">
      <div className="case-section__label">
        <span>08</span>
        <h2 id="code-map-title">Implementation map</h2>
      </div>
      <p className="section-intro">
        Every row opens the public file responsible for that boundary, so the
        architecture and its evidence can be checked without searching the
        repository tree.
      </p>
      <ol className="implementation-map">
        <li className="implementation-map__header" aria-hidden="true">
          <span>Boundary</span>
          <span>Public repository path</span>
          <span>Responsibility</span>
          <span>Proof status</span>
        </li>
        {implementationMap.map((item) => (
          <li key={item.boundary}>
            <strong>{item.boundary}</strong>
            <a href={item.href} target="_blank" rel="noreferrer noopener">
              <code>{item.path}</code>
            </a>
            <p>{item.responsibility}</p>
            <span>{item.proof}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
