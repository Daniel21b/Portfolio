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

const architectureLanes = [
  {
    name: 'PDF / image',
    input: 'PDF, JPG, JPEG, or PNG',
    output: 'normalized invoice record',
    steps: [
      {
        name: 'S3 / invoices/',
        detail: 'Encrypted object; public access blocked',
        owner: 'CDK-defined',
        payload: 'file + transaction_type metadata',
      },
      {
        name: 'ObjectCreated',
        detail: 'Extension-filtered notification',
        owner: 'CDK-defined',
        payload: 'at-least-once S3 event',
      },
      {
        name: 'Lambda validation',
        detail: 'Checks bucket, extension, size, metadata',
        owner: 'CDK-defined',
        payload: 'validated object reference',
      },
      {
        name: 'Textract',
        detail: 'Synchronous DetectDocumentText',
        owner: 'AWS service',
        payload: 'LINE blocks + confidence',
      },
      {
        name: 'Heuristic parser',
        detail: 'Maps lines to invoice fields',
        owner: 'Application code',
        payload: 'normalized invoice record',
      },
    ],
  },
  {
    name: 'Spreadsheet',
    input: 'CSV or XLSX',
    output: 'SQL rows',
    steps: [
      {
        name: 'Pandas validation',
        detail: 'Requires Date, Vendor, Amount, Category',
        owner: 'Application code',
        payload: 'validated preview',
      },
      {
        name: 'User confirmation',
        detail: 'Write begins only after explicit review',
        owner: 'Portal control',
        payload: 'confirmed rows',
      },
      {
        name: 'INSERT / COPY router',
        detail: '<100 rows: INSERT · ≥100 rows: COPY',
        owner: 'Database manager',
        payload: 'SQL rows',
      },
    ],
  },
  {
    name: 'Manual entry',
    input: 'Form fields',
    output: 'SQL row',
    steps: [
      {
        name: 'Form validation',
        detail: 'Checks required invoice fields',
        owner: 'Portal control',
        payload: 'validated fields',
      },
      {
        name: 'Direct INSERT',
        detail: 'SQLAlchemy-backed save_invoice',
        owner: 'Database manager',
        payload: 'SQL row',
      },
    ],
  },
] as const;

const walkthrough = [
  {
    title: 'Authenticate and classify',
    input: 'Administrator credential and one intake selection.',
    transformation:
      'Streamlit secrets are checked, authenticated session state is established, and the record is labeled INCOME or EXPENSE.',
    output: 'An authenticated session and a classified intake request.',
    path: 'src/web_portal/app.py · src/web_portal/pages/login.py',
    failure:
      'A failed credential check blocks the portal; missing or invalid form values stop that intake path before persistence.',
  },
  {
    title: 'Store and emit',
    input: 'A PDF or image plus its transaction classification.',
    transformation:
      'The Streamlit server uploads with boto3.upload_fileobj below invoices/. S3 stores the classification as object metadata and emits ObjectCreated.',
    output: 'An encrypted S3 object and an at-least-once event.',
    path: 'src/web_portal/app.py · invoice_pipeline/invoice_pipeline_stack.py',
    failure:
      'An upload error is returned to the portal. Event delivery has no queue or replay layer and may be duplicated or reordered.',
  },
  {
    title: 'Validate and extract',
    input: 'The S3 event and referenced object.',
    transformation:
      'Lambda validates the bucket, extension, size, and metadata before calling synchronous Textract DetectDocumentText.',
    output: 'Textract LINE blocks with confidence values.',
    path: 'src/lambda_functions/invoice_processor.py',
    failure:
      'Invalid objects are rejected and processing errors reach CloudWatch. The call is bounded by synchronous Textract limits and a 120-second Lambda timeout.',
  },
  {
    title: 'Normalize and persist',
    input:
      'Textract LINE blocks, confirmed spreadsheet rows, or validated manual fields.',
    transformation:
      'The document parser derives invoice fields; spreadsheet writes choose INSERT or COPY at 100 rows; manual entry uses a direct INSERT.',
    output:
      'Rows in invoices with source_type and INCOME/EXPENSE classification.',
    path: 'src/lambda_functions/invoice_processor.py · database/database.py · database/schema.sql',
    failure:
      'Database operations report errors and roll back where supported; document parsing can still produce incomplete heuristic matches.',
  },
  {
    title: 'Review and export',
    input: 'Stored invoice, source, confidence, and audit records.',
    transformation:
      'Queries calculate summaries and expose search, details, soft delete/restore, breakdowns, audit history, and CSV exports.',
    output: 'Reviewable query results rather than an opaque automation result.',
    path: 'src/web_portal/pages/01_Analytics.py · src/web_portal/pages/02_Invoice_Details.py · database/auth.py',
    failure:
      'Query and connection failures remain application-level errors; no production monitoring or SLA is claimed.',
  },
] as const;

const implementationMap = [
  {
    boundary: 'Infrastructure',
    path: 'invoice_pipeline/invoice_pipeline_stack.py',
    responsibility:
      'Defines S3, Lambda, IAM, S3 notifications, Lambda configuration, and the psycopg2 layer.',
    proof: 'Verified in code',
  },
  {
    boundary: 'Portal + upload',
    path: 'src/web_portal/app.py',
    responsibility:
      'Presents three intake modes, classification, boto3 upload, spreadsheet preview, and manual entry.',
    proof: 'Verified in code + demo',
  },
  {
    boundary: 'Authentication',
    path: 'src/web_portal/pages/login.py',
    responsibility:
      'Checks the configured administrator credential and controls authenticated session state.',
    proof: 'Verified in code',
  },
  {
    boundary: 'Document handler',
    path: 'src/lambda_functions/invoice_processor.py',
    responsibility:
      'Validates S3 events, invokes Textract, parses fields, writes PostgreSQL, and logs execution.',
    proof: 'Verified in code',
  },
  {
    boundary: 'Shared schema',
    path: 'database/schema.sql',
    responsibility:
      'Defines invoices and supporting audit/database structures used by all intake paths.',
    proof: 'Verified in code',
  },
  {
    boundary: 'Database manager',
    path: 'database/database.py',
    responsibility:
      'Implements direct saves, bulk INSERT/COPY routing, queries, lifecycle actions, and exports.',
    proof: 'Verified in code',
  },
  {
    boundary: 'Analytics',
    path: 'src/web_portal/pages/01_Analytics.py',
    responsibility:
      'Builds income/expense, monthly, category, vendor, source, daily, and confidence summaries.',
    proof: 'Verified in code',
  },
  {
    boundary: 'Details + export',
    path: 'src/web_portal/pages/02_Invoice_Details.py',
    responsibility:
      'Provides search, record detail, breakdowns, soft delete/restore, and CSV export.',
    proof: 'Verified in code',
  },
  {
    boundary: 'Audit',
    path: 'database/auth.py',
    responsibility:
      'Stores and retrieves authentication and audit-log records.',
    proof: 'Verified in code',
  },
  {
    boundary: 'Focused tests',
    path: 'tests/unit/test_invoice_processor.py · tests/unit/test_textract_parser.py',
    responsibility: 'Exercises document-handler and parser behavior.',
    proof: '51 passed locally · no public CI claim',
  },
] as const;

export function InvoiceSectionIndex() {
  return (
    <nav className="case-index" aria-label="Invoice case study sections">
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

export function InvoiceArchitectureMap() {
  return (
    <figure className="invoice-map" aria-labelledby="invoice-map-caption">
      <figcaption id="invoice-map-caption">
        Three authenticated invoice intake paths split at the Streamlit portal,
        converge on one PostgreSQL invoice model, and fan out to four review
        surfaces.
      </figcaption>

      <div className="invoice-map__legend" aria-label="Ownership legend">
        <span>
          <i data-key="cdk" /> CDK-defined
        </span>
        <span>
          <i data-key="app" /> Application code
        </span>
        <span>
          <i data-key="external" /> External configuration
        </span>
      </div>

      <section
        className="invoice-map__portal"
        aria-label="Shared control boundary">
        <div>
          <span>Shared control boundary</span>
          <strong>Authenticated Streamlit portal</strong>
          <p>
            One administrator credential from Streamlit secrets gates PDF/image,
            spreadsheet, and manual intake. Every path records INCOME or
            EXPENSE.
          </p>
        </div>
        <dl>
          <div>
            <dt>Credential</dt>
            <dd>Streamlit secrets</dd>
          </div>
          <div>
            <dt>State</dt>
            <dd>Authenticated session</dd>
          </div>
          <div>
            <dt>Output</dt>
            <dd>Classified intake</dd>
          </div>
        </dl>
      </section>

      <div className="invoice-map__split" aria-hidden="true">
        <span>split by input shape</span>
      </div>

      <div className="invoice-map__lanes">
        {architectureLanes.map((lane, laneIndex) => (
          <section
            className="invoice-map__lane"
            key={lane.name}
            aria-labelledby={`invoice-lane-${laneIndex}`}>
            <header>
              <span>Lane {String(laneIndex + 1).padStart(2, '0')}</span>
              <h3 id={`invoice-lane-${laneIndex}`}>{lane.name}</h3>
              <p>Input: {lane.input}</p>
            </header>
            <ol>
              {lane.steps.map((step, index) => (
                <li key={step.name}>
                  <article
                    className="invoice-map__node"
                    data-owner={
                      step.owner === 'CDK-defined'
                        ? 'cdk'
                        : step.owner === 'AWS service'
                          ? 'external'
                          : 'app'
                    }>
                    <span>{step.owner}</span>
                    <strong>{step.name}</strong>
                    <p>{step.detail}</p>
                  </article>
                  {index < lane.steps.length - 1 ? (
                    <span className="invoice-map__payload">
                      <b aria-hidden="true">→</b>
                      {step.payload}
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="invoice-map__lane-output">
              <span aria-hidden="true">↓</span> {lane.output}
            </p>
          </section>
        ))}
      </div>

      <div className="invoice-map__converge" aria-hidden="true">
        <span>converge on one record model</span>
      </div>

      <section
        className="invoice-map__database"
        aria-label="Persistence boundary">
        <div>
          <span>External infrastructure</span>
          <strong>PostgreSQL · invoices</strong>
          <p>
            Shared normalized rows retain transaction classification,
            source_type, extracted fields, and confidence where available.
          </p>
        </div>
        <aside>
          <strong>CDK stops here</strong>
          <p>
            RDS, VPC/networking, and credentials are externally configured; the
            stack does not provision them.
          </p>
        </aside>
      </section>

      <div className="invoice-map__fan-label" aria-hidden="true">
        <span>query results fan out</span>
      </div>
      <section className="invoice-map__consumers" aria-label="Review surfaces">
        <article>
          <span>01</span>
          <strong>Statistics</strong>
          <p>Main-portal totals and recent activity</p>
        </article>
        <article>
          <span>02</span>
          <strong>Analytics</strong>
          <p>Income/expense, time, category, vendor, source, confidence</p>
        </article>
        <article>
          <span>03</span>
          <strong>Search / details</strong>
          <p>Records, breakdowns, soft delete, restore</p>
        </article>
        <article>
          <span>04</span>
          <strong>Audit / CSV</strong>
          <p>Trace views and downloadable exports</p>
        </article>
      </section>

      <footer className="invoice-map__runtime">
        <span>Runtime side-channel</span>
        <p>
          Lambda execution logs flow to CloudWatch. There is no Step Functions
          state machine, queue, dead-letter queue, or public application
          endpoint in the implemented stack.
        </p>
      </footer>
    </figure>
  );
}

export function InvoiceBoundaryWalkthrough() {
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
        Each handoff names what enters, what changes, what leaves, and how the
        current implementation fails.
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
              <span>Path</span>
              <code>{item.path}</code>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function InvoiceImplementationMap() {
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
        A reader can move from a system boundary to the responsible repository
        path without reverse-engineering the project tree.
      </p>
      <ol className="implementation-map">
        <li className="implementation-map__header" aria-hidden="true">
          <span>Boundary</span>
          <span>Repository path</span>
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
