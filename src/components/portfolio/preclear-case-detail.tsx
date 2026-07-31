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

const knowledgeSteps = [
  {
    owner: 'Unproven boundary',
    name: 'Scraper-produced snapshot',
    detail: '354 JSONL rows · 39 source pages · 21 county values',
    payload: 'source text + county + URL metadata',
    path: 'PreClear_pipeline/data/chunks.jsonl',
    state: 'unproven',
  },
  {
    owner: 'Scheduled automation',
    name: 'Weekly GitHub Action',
    detail: 'Manual dispatch + Sundays at 02:00 UTC',
    payload: 'Python 3.11 ingestion run',
    path: 'PreClear_pipeline/.github/workflows/ingest_codes.yml',
    state: 'scheduled',
  },
  {
    owner: 'Python ingestion',
    name: 'Quality + normalization',
    detail: 'Prose density, word count, noise filters, county aliases',
    payload: 'accepted normalized chunks',
    path: 'PreClear_pipeline/ingest_maryland.py',
    state: 'code',
  },
  {
    owner: 'Python ingestion',
    name: 'Content-hash dedup',
    detail: 'Hash text and skip rows already stored',
    payload: 'novel chunk batches',
    path: 'PreClear_pipeline/ingest_maryland.py',
    state: 'code',
  },
  {
    owner: 'External service',
    name: 'OpenAI embeddings',
    detail: 'text-embedding-3-small · batches of 100 · retry',
    payload: 'chunk + embedding + provenance',
    path: 'PreClear_pipeline/ingest_maryland.py',
    state: 'external',
  },
] as const;

const walkthrough = [
  {
    title: 'Produce and filter the snapshot',
    input:
      'Scraper-produced JSONL containing source text, source URL, content type, and Maryland county metadata.',
    transformation:
      'The collector boundary is private and unproven. The checked-in ingestion path applies prose-density, word-count, and noise-type filters before accepting rows.',
    output:
      'A repository snapshot of 354 rows from 39 source pages; the latest inspected run accepted 331 rows before its database step failed.',
    path: 'PreClear_pipeline/data/chunks.jsonl · ingest_maryland.py',
    failure:
      'Collection failures cannot be audited from these repositories, and a checked-in snapshot does not prove current jurisdiction coverage.',
  },
  {
    title: 'Normalize, deduplicate, embed, and upsert',
    input: 'Accepted text chunks with county and source metadata.',
    transformation:
      'County aliases are normalized, active jurisdictions are resolved, chunk text is hashed, existing hashes are skipped, and new text is embedded in batches of 100 with retry.',
    output: 'Provenance-bearing rows upserted into ordinance_chunks.',
    path: 'PreClear_pipeline/ingest_maryland.py · permitsaas/ingest/',
    failure:
      'The latest workflow failed at database authentication; the richer versioned ingest package has no located deployment workflow.',
  },
  {
    title: 'Validate and authorize a permit request',
    input: 'Project attributes, jurisdiction selection, and user session.',
    transformation:
      'The Next.js route validates payload shape with Zod, verifies a Supabase session, and checks plan entitlements before resolution begins.',
    output: 'An authorized, typed permit-check request.',
    path: 'permitsaas/app/api/permit-check/route.ts · lib/entitlements.ts',
    failure:
      'Invalid input, missing authentication, or insufficient entitlement stops the request before rule or retrieval work.',
  },
  {
    title: 'Evaluate deterministic rules first',
    input: 'Jurisdiction, project type, and normalized project attributes.',
    transformation:
      'The route loads active permit_rules and evaluates explicit thresholds before considering retrieval or generation.',
    output: 'A permit determination with a rule citation when a rule resolves.',
    path: 'permitsaas/app/api/permit-check/route.ts',
    failure:
      'If no applicable rule resolves, control moves to the jurisdiction-scoped retrieval track rather than inventing a deterministic answer.',
  },
  {
    title: 'Retrieve context and guard the fallback',
    input: 'A query embedding plus jurisdiction scope.',
    transformation:
      'The hybrid_permit_search RPC combines pgvector similarity and PostgreSQL full-text rank through reciprocal-rank fusion, then applies a confidence gate before a constrained GPT-4o prompt.',
    output:
      'A cited, constrained answer when retrieval is sufficient; otherwise the hard-stop result VERIFY_WITH_COUNTY.',
    path: 'permitsaas/supabase/migrations/023_rag_hybrid_search.sql · lib/rag/buildPermitPrompt.ts',
    failure:
      'The current RRF score scale and 0.35 threshold are mismatched, likely making the generated-answer branch unreachable until calibrated.',
  },
  {
    title: 'Persist and return one decision record',
    input:
      'Deterministic result, constrained retrieval result, or uncertainty fallback.',
    transformation:
      'The route records the check against user_projects and returns its determination, citation/context, and uncertainty state to the product surface.',
    output:
      'One reviewable permit-check result plus persisted usage/project state.',
    path: 'permitsaas/app/api/permit-check/route.ts · supabase/migrations/',
    failure:
      'Database or service errors return an application error; no legal-accuracy, uptime, or service-level guarantee is claimed.',
  },
] as const;

const implementationMap = [
  {
    boundary: 'Schedule',
    path: 'PreClear_pipeline/.github/workflows/ingest_codes.yml',
    responsibility:
      'Runs ingestion manually or Sundays at 02:00 UTC with Python 3.11.',
    proof: 'Verified privately',
  },
  {
    boundary: 'Source snapshot',
    path: 'PreClear_pipeline/data/chunks.jsonl',
    responsibility:
      'Stores 354 scraper-produced records across 39 source pages and 21 county values.',
    proof: 'Artifact verified · collection private',
  },
  {
    boundary: 'Active ingestion',
    path: 'PreClear_pipeline/ingest_maryland.py',
    responsibility:
      'Filters, normalizes, hashes, deduplicates, embeds, retries, and upserts chunks.',
    proof: 'Verified privately',
  },
  {
    boundary: 'Versioned ingestion',
    path: 'permitsaas/ingest/pipeline.py · ingest/chunks.py',
    responsibility:
      'Adds document versions, batched embedding/upsert behavior, and change alerts.',
    proof: 'Code verified · deployment unproven',
  },
  {
    boundary: 'Permit decision route',
    path: 'permitsaas/app/api/permit-check/route.ts',
    responsibility:
      'Validates, authorizes, evaluates rules, retrieves context, gates fallback, and persists checks.',
    proof: 'Verified privately',
  },
  {
    boundary: 'Hybrid retrieval',
    path: 'permitsaas/supabase/migrations/023_rag_hybrid_search.sql',
    responsibility:
      'Defines pgvector + full-text reciprocal-rank-fusion search.',
    proof: 'Verified privately · calibration defect',
  },
  {
    boundary: 'Prompt constraint',
    path: 'permitsaas/lib/rag/buildPermitPrompt.ts',
    responsibility:
      'Builds the ordinance-grounded response prompt and uncertainty behavior.',
    proof: 'Verified privately',
  },
  {
    boundary: 'Entitlements',
    path: 'permitsaas/lib/entitlements.ts',
    responsibility:
      'Checks account access before permit resolution consumes product resources.',
    proof: 'Verified privately',
  },
  {
    boundary: 'Data model',
    path: 'permitsaas/supabase/migrations/',
    responsibility:
      'Defines jurisdictions, rules, documents, chunks, vectors, RLS, projects, billing, and API keys.',
    proof: 'Verified privately',
  },
  {
    boundary: 'Tests',
    path: 'permitsaas/__tests__/ · permitsaas/e2e/',
    responsibility: 'Covers application behavior with Vitest and Playwright.',
    proof: '274 passed · 5 failed locally',
  },
] as const;

function MapNode({
  owner,
  name,
  detail,
  path,
  state,
}: {
  owner: string;
  name: string;
  detail: string;
  path: string;
  state: string;
}) {
  return (
    <article className="preclear-map__node" data-state={state}>
      <span>{owner}</span>
      <strong>{name}</strong>
      <p>{detail}</p>
      <code>{path}</code>
    </article>
  );
}

export function PreClearSectionIndex() {
  return (
    <nav className="case-index" aria-label="PreClear case study sections">
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

export function PreClearArchitectureMap() {
  return (
    <figure className="preclear-map" aria-labelledby="preclear-map-caption">
      <figcaption id="preclear-map-caption">
        Two rails, one decision record. Scheduled ingestion prepares the
        jurisdiction-scoped knowledge store; request-time logic resolves a
        project through explicit rules first, then a guarded retrieval fallback.
      </figcaption>

      <div className="preclear-map__legend" aria-label="System boundary legend">
        <span>
          <i data-key="verified" /> Repository-backed code
        </span>
        <span>
          <i data-key="database" /> Database-defined behavior
        </span>
        <span>
          <i data-key="external" /> External service
        </span>
        <span>
          <i data-key="unproven" /> Private or failing boundary
        </span>
      </div>

      <section
        className="preclear-map__rail preclear-map__rail--knowledge"
        aria-labelledby="knowledge-rail-title">
        <header>
          <div>
            <span>Rail A · scheduled</span>
            <h3 id="knowledge-rail-title">Knowledge preparation</h3>
          </div>
          <p>Clock: manual dispatch + Sunday 02:00 UTC</p>
        </header>
        <ol>
          {knowledgeSteps.map((step, index) => (
            <li key={step.name}>
              <MapNode {...step} />
              {index < knowledgeSteps.length - 1 ? (
                <span className="preclear-map__handoff">
                  <b aria-hidden="true">→</b>
                  {step.payload}
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <div className="preclear-map__store-join" aria-hidden="true">
        <span>upsert versioned knowledge</span>
      </div>

      <section
        className="preclear-map__store"
        aria-label="Shared data boundary">
        <div>
          <span>Supabase / PostgreSQL</span>
          <strong>Rules, ordinance knowledge, provenance, product state</strong>
          <p>
            Jurisdictions · permit_rules · raw_documents · ordinance_chunks ·
            pgvector + FTS indexes · RLS · user_projects · usage
          </p>
        </div>
        <aside>
          <span>Database-defined behavior</span>
          <strong>hybrid_permit_search</strong>
          <p>
            Jurisdiction-scoped reciprocal-rank fusion over vector and text.
          </p>
        </aside>
      </section>

      <div className="preclear-map__request-entry" aria-hidden="true">
        <span>read at request time</span>
      </div>

      <section
        className="preclear-map__rail preclear-map__rail--request"
        aria-labelledby="request-rail-title">
        <header>
          <div>
            <span>Rail B · request time</span>
            <h3 id="request-rail-title">Permit decision</h3>
          </div>
          <p>Clock: one authenticated product request</p>
        </header>

        <div className="preclear-map__request-gate">
          <MapNode
            owner="Next.js 16 / TypeScript"
            name="Permit-check route"
            detail="Project attributes + jurisdiction enter the server route."
            path="permitsaas/app/api/permit-check/route.ts"
            state="code"
          />
          <span className="preclear-map__handoff">
            <b aria-hidden="true">→</b>
            Zod-validated request
          </span>
          <MapNode
            owner="Request guard"
            name="Session + entitlements"
            detail="Supabase authentication and plan access gate resolution."
            path="permitsaas/lib/entitlements.ts"
            state="code"
          />
        </div>

        <div className="preclear-map__switch" aria-hidden="true">
          <span>decision switch · rules before generation</span>
        </div>

        <div className="preclear-map__tracks">
          <article className="preclear-map__track">
            <header>
              <span>Track 1 · deterministic</span>
              <strong>Resolve explicit rule thresholds</strong>
            </header>
            <div>
              <MapNode
                owner="PostgreSQL rule rows"
                name="Active permit_rules"
                detail="Scoped by jurisdiction and project type."
                path="permitsaas/supabase/migrations/"
                state="database"
              />
              <span className="preclear-map__handoff">
                <b aria-hidden="true">→</b>
                thresholds + project attributes
              </span>
              <MapNode
                owner="Server-side evaluator"
                name="Deterministic result"
                detail="Returns the first matching rule; precedence and compound handling are not explicit."
                path="permitsaas/app/api/permit-check/route.ts"
                state="code"
              />
            </div>
          </article>

          <article className="preclear-map__track">
            <header>
              <span>Track 2 · guarded retrieval</span>
              <strong>
                Resolve only when ordinance evidence is sufficient
              </strong>
            </header>
            <div>
              <MapNode
                owner="OpenAI + PostgreSQL RPC"
                name="Hybrid retrieval"
                detail="Query embedding + jurisdiction-scoped vector/FTS RRF."
                path="023_rag_hybrid_search.sql"
                state="external"
              />
              <span className="preclear-map__handoff">
                <b aria-hidden="true">→</b>
                ranked ordinance chunks
              </span>
              <MapNode
                owner="Known defect"
                name="Confidence gate"
                detail="RRF max ≈0.041 versus configured threshold 0.35."
                path="permit-check/route.ts"
                state="risk"
              />
            </div>
            <div className="preclear-map__resolution">
              <div>
                <span>Pass</span>
                <strong>Constrained GPT-4o answer</strong>
                <p>
                  Ordinance context bounds the prompt; the route currently
                  normalizes any non-verify answer to permit_required.
                </p>
              </div>
              <div className="preclear-map__hard-stop">
                <span>Insufficient evidence</span>
                <strong>VERIFY_WITH_COUNTY</strong>
                <p>No generated compliance determination.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="preclear-map__persist" aria-hidden="true">
        <span>persist whichever track resolves</span>
      </div>

      <section className="preclear-map__record" aria-label="Decision output">
        <div>
          <span>One decision record</span>
          <strong>user_projects + check usage</strong>
          <p>
            Request context, determination, and product usage state persist.
          </p>
        </div>
        <div>
          <span>Product surface</span>
          <strong>Result + citation + uncertainty</strong>
          <p>The live surface is verified; release parity is not.</p>
        </div>
      </section>
    </figure>
  );
}

export function PreClearBoundaryWalkthrough() {
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
        Six handoffs connect a privately collected source artifact to a
        reviewable permit result. Each row names its payload, implementation
        owner, and failure behavior.
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
                <dt>Failure behavior</dt>
                <dd>{item.failure}</dd>
              </div>
            </dl>
            <p>
              <span>Private repository path</span>
              <code>{item.path}</code>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PreClearImplementationMap() {
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
        Public repository links are intentionally absent. These logical private
        paths let a reviewer map every system claim to the audited code
        boundary.
      </p>
      <ol className="implementation-map">
        <li className="implementation-map__header" aria-hidden="true">
          <span>Boundary</span>
          <span>Private repository path</span>
          <span>Responsibility</span>
          <span>Proof status</span>
        </li>
        {implementationMap.map((item) => (
          <li key={item.boundary}>
            <strong>{item.boundary}</strong>
            <code>{item.path}</code>
            <p>{item.responsibility}</p>
            <span>{item.proof}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
