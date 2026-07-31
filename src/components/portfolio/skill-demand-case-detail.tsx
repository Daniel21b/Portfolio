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

const acquisitionLanes = [
  {
    id: 'hn',
    label: 'Lane 01 · page parsing',
    name: 'Hacker News “Who is Hiring?”',
    input: 'Planned input · 13 thread IDs',
    state: 'risk',
    steps: [
      {
        name: 'Requests + BeautifulSoup',
        detail: 'Rate-limited HTML fetch and comment parser.',
        state: 'code',
      },
      {
        name: 'Monthly raw CSVs',
        detail: '711 rows across five checked-in files.',
        state: 'artifact',
      },
    ],
    output:
      'Observed boundary · only May and October contribute materially; misses and false positives remain visible risks.',
  },
  {
    id: 'adzuna',
    label: 'Lane 02 · paginated API',
    name: 'Adzuna keyword queries',
    input: '10 keywords · up to 10 pages each · 50 results/page',
    state: 'code',
    steps: [
      {
        name: 'Paginated collection',
        detail: 'Requests each keyword/page combination.',
        state: 'code',
      },
      {
        name: 'ID dedup + checkpoints',
        detail: '5,000 candidates → 3,691 unique IDs in 10.6 min.',
        state: 'artifact',
      },
    ],
    output:
      'Recorded run · 1,309 repeated IDs rejected (26.2%); checkpoints preserve partial progress if a later request fails.',
  },
] as const;

const contractSteps = [
  {
    label: 'Validate HN',
    detail: 'Content, role, company, and job-signal checks.',
    result: '711 → 611 rows in saved output',
    state: 'code',
  },
  {
    label: 'Align schemas',
    detail: 'Source-prefixed IDs, normalized dates, shared 21-column model.',
    result: 'One cross-source contract',
    state: 'code',
  },
  {
    label: 'Deduplicate',
    detail: 'Exact → ID → business key → >90% description similarity.',
    result: 'Multi-stage cleaning path',
    state: 'code',
  },
  {
    label: 'Pin the artifact',
    detail: '3,608 Adzuna + 529 Hacker News rows.',
    result: 'jobs_cleaned.csv · 4,137 rows',
    state: 'artifact',
  },
] as const;

const walkthrough = [
  {
    title: 'Select source windows and search terms',
    input:
      'A planned Hacker News thread range and 10 Adzuna role/search keywords.',
    transformation:
      'The notebooks make source-specific collection parameters explicit before requests begin.',
    output:
      'A bounded collection plan: 13 HN thread IDs and up to 10 Adzuna pages per keyword at 50 results per page.',
    path: 'notebooks/01_scraping_hackernews.ipynb · notebooks/02_api_data_collection.ipynb',
    failure:
      'The configured plan is not proof that every source window returned valid data; several checked-in HN files contain false positives.',
  },
  {
    title: 'Collect and checkpoint Adzuna pages',
    input: 'Keyword/page requests plus Adzuna API credentials.',
    transformation:
      'Requests paginated results, rejects IDs already seen during collection, and writes checkpoint CSVs as work accumulates.',
    output:
      'A saved 10.6-minute run with 5,000 candidates reduced to 3,691 unique IDs; 1,309 repeats rejected (26.2%).',
    path: 'notebooks/02_api_data_collection.ipynb · notebooks/data/raw/',
    failure:
      'Checkpoints limit lost work, but there is no scheduler, retry policy, freshness monitor, or immutable run manifest.',
  },
  {
    title: 'Parse and validate Hacker News threads',
    input: 'HTML comments from the planned “Who is Hiring?” thread list.',
    transformation:
      'BeautifulSoup parses candidate posts; content, role, company, and job-signal checks remove obvious false positives.',
    output:
      '711 raw rows and a saved validation output of 611 retained / 100 removed / 14.1%.',
    path: 'notebooks/01_scraping_hackernews.ipynb · notebooks/03_data_cleaning.ipynb',
    failure:
      'DOM and prose heuristics can miss postings or retain non-jobs, and only two months contribute materially in the checked-in files.',
  },
  {
    title: 'Align and deduplicate the cleaned artifact',
    input: 'Validated HN rows and raw Adzuna rows with different schemas.',
    transformation:
      'Prefixes IDs by source, aligns a 21-column schema, normalizes dates, then applies exact, ID, business-key, and description-similarity checks.',
    output:
      'jobs_cleaned.csv with 4,137 rows: 3,608 Adzuna and 529 HN; zero exact or company+role+location duplicates.',
    path: 'notebooks/03_data_cleaning.ipynb · notebooks/data/processed/jobs_cleaned.csv',
    failure:
      'The final dedup notebook cell lacks saved output, so the checked-in CSV is inspectable but the end-to-end run is not fully reproducible.',
  },
  {
    title: 'Score role families and run statistical notebooks',
    input: 'Cleaned titles and descriptions.',
    transformation:
      'A transparent scoring taxonomy applies 135 regex patterns across AI/ML, general IT, hybrid, and non-tech; later notebooks contain regression and Mann–Kendall analysis code.',
    output: 'Categorized records and candidate trend results for review.',
    path: 'notebooks/05_job_role_categorization.ipynb · notebooks/06_time_series_analysis.ipynb',
    failure:
      'The taxonomy can drift, and conflicting data dates/report claims prevent the trend headlines from being published as verified results.',
  },
  {
    title: 'Publish the review surfaces',
    input: 'The cleaned or categorized artifact plus notebook results.',
    transformation:
      'Streamlit renders interactive filters and Plotly views; the report notebook publishes a static HTML surface.',
    output: 'A dashboard deployment, static report, and public repository.',
    path: 'app.py · notebooks/07_final_report.ipynb',
    failure:
      'The app can silently generate randomized synthetic data when source files are absent; the deployment currently enters an authentication redirect loop, and deployed-data parity is not proven.',
  },
] as const;

const implementationMap = [
  {
    boundary: 'HN acquisition',
    path: 'notebooks/01_scraping_hackernews.ipynb',
    href: `${repositoryBase}/notebooks/01_scraping_hackernews.ipynb`,
    responsibility:
      'Selects HN threads, rate-limits requests, parses comments, and writes monthly raw files.',
    proof: 'Public code + raw files',
  },
  {
    boundary: 'Adzuna acquisition',
    path: 'notebooks/02_api_data_collection.ipynb',
    href: `${repositoryBase}/notebooks/02_api_data_collection.ipynb`,
    responsibility:
      'Paginates 10 keyword searches, deduplicates IDs, and checkpoints collection.',
    proof: 'Public code + 3,691 rows',
  },
  {
    boundary: 'Cleaning contract',
    path: 'notebooks/03_data_cleaning.ipynb',
    href: `${repositoryBase}/notebooks/03_data_cleaning.ipynb`,
    responsibility:
      'Validates HN, aligns 21 columns, prefixes source IDs, and applies staged deduplication.',
    proof: 'Public code · saved output partial',
  },
  {
    boundary: 'Company normalization',
    path: 'notebooks/04_company_standardization.ipynb',
    href: `${repositoryBase}/notebooks/04_company_standardization.ipynb`,
    responsibility:
      'Standardizes company values before aggregation and analysis.',
    proof: 'Public code',
  },
  {
    boundary: 'Role taxonomy',
    path: 'notebooks/05_job_role_categorization.ipynb',
    href: `${repositoryBase}/notebooks/05_job_role_categorization.ipynb`,
    responsibility:
      'Scores four role families through 135 explicit regex patterns.',
    proof: 'Public code · output not pinned',
  },
  {
    boundary: 'Trend analysis',
    path: 'notebooks/06_time_series_analysis.ipynb',
    href: `${repositoryBase}/notebooks/06_time_series_analysis.ipynb`,
    responsibility:
      'Implements time-series, regression, and Mann–Kendall analysis.',
    proof: 'Code verified · findings withheld',
  },
  {
    boundary: 'Static report',
    path: 'notebooks/07_final_report.ipynb',
    href: `${repositoryBase}/notebooks/07_final_report.ipynb`,
    responsibility:
      'Assembles the published narrative and static analysis output.',
    proof: 'Public notebook + URL',
  },
  {
    boundary: 'Live surface',
    path: 'app.py',
    href: `${repositoryBase}/app.py`,
    responsibility:
      'Loads the retained data, applies fallback categorization, and renders Streamlit/Plotly views.',
    proof: 'Public code · parity limited',
  },
  {
    boundary: 'Checked-in evidence',
    path: 'notebooks/data/raw/ · notebooks/data/processed/jobs_cleaned.csv',
    href: `${repositoryBase}/notebooks/data/processed/jobs_cleaned.csv`,
    responsibility:
      'Pins the raw source files and the 4,137-row cleaned artifact used for inspection.',
    proof: 'Artifact counted July 31, 2026',
  },
  {
    boundary: 'Runtime dependencies',
    path: 'requirements.txt',
    href: `${repositoryBase}/requirements.txt`,
    responsibility:
      'Declares the Python analysis, parsing, statistics, and reporting packages.',
    proof: 'Public dependency manifest',
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
            artifact: 'Checked-in artifact',
            surface: 'Published surface',
            risk: 'Evidence gap / risk',
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
        A source-to-proof data contract. Two collection lanes converge on a
        pinned CSV, pass through explicit interpretation rules, and surface only
        the conclusions the artifacts can support.
      </figcaption>

      <div
        className="skill-demand-map__legend"
        aria-label="Architecture evidence legend">
        <span>
          <i data-key="code" /> Repository-backed implementation
        </span>
        <span>
          <i data-key="artifact" /> Checked-in data artifact
        </span>
        <span>
          <i data-key="surface" /> Published surface
        </span>
        <span>
          <i data-key="risk" /> Evidence gap / risk
        </span>
      </div>

      <section
        className="skill-demand-map__band skill-demand-map__band--acquisition"
        aria-labelledby="acquisition-band-title">
        <header>
          <span>Band A</span>
          <h3 id="acquisition-band-title">Acquisition</h3>
          <p>Two sources · two distinct failure models</p>
        </header>
        <div className="skill-demand-map__lanes">
          {acquisitionLanes.map((lane) => (
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
        <span>raw source checkpoints</span>
      </div>

      <section
        className="skill-demand-map__band skill-demand-map__band--contract"
        aria-labelledby="contract-band-title">
        <header>
          <span>Band B</span>
          <h3 id="contract-band-title">Data contract</h3>
          <p>Make source differences explicit before counting</p>
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
          <strong>Observed invariant</strong>
          <span>
            4,137 retained rows · 3,608 Adzuna + 529 HN · zero exact and
            company+role+location duplicates
          </span>
        </p>
      </section>

      <div className="skill-demand-map__handoff" aria-hidden="true">
        <span>pinned analytical input</span>
      </div>

      <section
        className="skill-demand-map__band skill-demand-map__band--interpretation"
        aria-labelledby="interpretation-band-title">
        <header>
          <span>Band C</span>
          <h3 id="interpretation-band-title">Interpretation</h3>
          <p>Transparent taxonomy; bounded conclusions</p>
        </header>
        <div>
          <FlowNode
            name="Regex-scored role taxonomy"
            detail="135 patterns: 49 AI/ML · 60 general IT · 7 hybrid · 19 non-tech."
            state="code"
          />
          <FlowNode
            name="Trend and statistical notebooks"
            detail="Regression and Mann–Kendall code exists; headline results are withheld until source dates and report claims reconcile."
            state="risk"
          />
        </div>
      </section>

      <div className="skill-demand-map__handoff" aria-hidden="true">
        <span>reviewable outputs</span>
      </div>

      <section
        className="skill-demand-map__band skill-demand-map__band--proof"
        aria-labelledby="proof-band-title">
        <header>
          <span>Band D</span>
          <h3 id="proof-band-title">Proof surfaces</h3>
          <p>Inspect the product, narrative, and source</p>
        </header>
        <div>
          <FlowNode
            name="Streamlit dashboard"
            detail="Loads the cleaned CSV and applies a smaller fallback taxonomy; missing files trigger synthetic data, and the deployment currently loops through authentication."
            state="risk"
          />
          <FlowNode
            name="Static report"
            detail="Published HTML and final-report notebook expose the analytical narrative."
            state="surface"
          />
          <FlowNode
            name="Public repository"
            detail="Raw/processed files, seven notebooks, app, and runtime manifest remain inspectable."
            state="surface"
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
        Six handoffs connect source selection to published analysis. Each row
        names the payload, transformation, repository owner, and the point where
        confidence must stop.
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
        architecture can be checked without searching the repository tree.
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
