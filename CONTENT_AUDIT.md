# Portfolio content audit

Audit date: July 31, 2026

This file records claims that were removed or withheld during the case-study
redesign. It is a maintainer artifact, not public marketing copy.

## Withheld claims

### Automated Invoice Processing Pipeline

- Removed the `95%` processing-time reduction claim.
- Reason: the public repository does not provide a named baseline, timing
  protocol, sample count, or results artifact.
- Evidence required to restore it: a reproducible benchmark that names the
  baseline implementation, the measured interval, input sample, environment,
  summary statistic, and raw results.
- Corrected the architecture to match the implementation: the portal uploads
  through server-side `boto3`, S3 invokes Lambda directly, and Lambda calls
  synchronous Textract. The repository does not implement presigned uploads or
  a Step Functions state machine.
- Corrected the infrastructure boundary: CDK defines S3, Lambda, IAM,
  notifications, Lambda configuration, and the psycopg2 layer. RDS,
  VPC/networking, credentials, and a public endpoint are external.
- Withheld the README's cost, runtime, throughput, scale, and production-readiness
  language because no dated measurement or deployment artifact supports it.
- Idempotency is not claimed: the handler creates a string for logging but does
  not check or persist it. Confidence-based review routing is also not active.
- Focused local verification on July 30, 2026:
  `python -m pytest tests/unit/test_invoice_processor.py
tests/unit/test_textract_parser.py -q` returned `51 passed`. This is recorded
  as local verification, not public CI or full-suite evidence; repository
  integration tests are explicitly skipped.

### PreClear AI

- Withheld the `50+` municipality coverage count.
- Reason: the live marketing surface states the count, but the audited
  repositories do not contain a reproducible coverage artifact supporting it.
- Evidence required to restore it: a dated, deduplicated jurisdiction export
  with source URL, jurisdiction identifier, last-seen date, and rule version.
- Corrected the resume-derived architecture: the audited request service is
  Next.js 16 / TypeScript, not FastAPI. Apify collector code was not found in
  either repository and is not claimed.
- The checked-in source artifact contains 354 raw JSONL chunks from 39 distinct
  document/source URLs across 21 county values. The latest inspected run
  reported 331 rows passing filters before database authentication failed.
  These counts describe a repository snapshot, not active production coverage.
- The active ingestion path filters, normalizes county aliases, hashes chunk
  text, skips existing hashes, embeds with `text-embedding-3-small` in batches
  of 100 with retry, and upserts to Supabase/PostgreSQL.
- The permit-check route uses deterministic `permit_rules` first, then a
  jurisdiction-scoped pgvector and PostgreSQL full-text RPC with
  reciprocal-rank fusion. Insufficient retrieval returns
  `VERIFY_WITH_COUNTY`.
- The configured RRF score can theoretically peak near `0.041`, while the
  application compares it with `0.35`. The generated-answer branch is treated
  as likely unreachable until calibration is fixed.
- Any non-`VERIFY_WITH_COUNTY` generated result is normalized to
  `permit_required`; this can misclassify a generated “not required” result.
  The deterministic path also selects the first matching rule without explicit
  priority or compound-rule handling. Seed rules are labeled examples that
  require verification.
- Local Vitest verification on July 30, 2026 returned `274 passed` and
  `5 failed` across six files, with additional unhandled mock errors. The suite
  is not described as green.
- GitHub records 33 ingestion workflow runs: 6 successes, 26 failures, and
  1 cancellation. The latest ten inspected scheduled runs failed; the July 26
  run stopped at database authentication. Automation is configured, not
  currently proven reliable.
- The application build compiled and passed TypeScript, then failed page-data
  collection because Stripe is initialized at module load without a local
  secret. Build portability is recorded as limited.
- A successful Vercel production deployment exists for private application
  commit `c840010` on March 9, 2026. This proves a deployment artifact, not that
  the current `preclearai.net` surface serves that release.
- Accuracy, freshness, active coverage, latency, adoption, and business
  outcomes remain withheld pending dated measurement artifacts.

### Tech Skill Demand Platform

- The requested `Daniel21b/skill-demand-platform` repository does not exist.
  The portfolio case is therefore grounded in the public
  `Daniel21b/Job-Market-Analytics` repository and does not link to the missing
  URL.
- Withheld PySpark, Airbyte, Airflow, dbt, BigQuery, and Docker as implemented
  components. The audited repository contains no corresponding runtime,
  configuration, model, DAG, or container artifacts.
- Withheld `120K+` postings, eight months of queryable history, `18%` duplicate
  removal, `500+` skill tags, the `40`-to-`12`-minute runtime, `40+` dbt tests,
  freshness alerts, and the `4 GB`-to-`1.5 GB` scan reduction. No matching
  repository, run history, manifest, test output, query plan, bytes-billed
  record, or benchmark protocol exists.
- Verified the checked-in `jobs_cleaned.csv` on July 31, 2026: 4,137 rows,
  including 3,608 Adzuna and 529 Hacker News rows, with zero exact or
  company+role+location duplicates.
- Verified the saved source-specific run outputs: Adzuna returned 5,000
  candidates and retained 3,691 unique IDs in 10.6 minutes, rejecting 1,309
  repeats (`26.2%`); Hacker News validation retained 611 of 711 rows, removing
  100 (`14.1%`). None of these methods produces the proposed `18%` metric.
- Corrected the implemented taxonomy to 135 regex patterns: 49 AI/ML, 60
  general IT, 7 hybrid, and 19 non-tech. This is a four-family role taxonomy,
  not 500+ normalized skill tags.
- Verified all nine commits in the full public GitHub history are authored by
  Daniel Berhane.
- Withheld both README growth figures (`42%` and `82.4%`) and the sample-results
  table. The final artifact has only three material month buckets: 298 rows in
  May 2024, 231 in October 2024, and 3,608 in October 2025. That contradicts
  the stated October 2023–October 2024 / 13-month frame.
- The date filter compares timezone-aware API timestamps with naive bounds,
  catches the resulting error, and returns `True`. That behavior admits 2025
  records through the intended 2023–2024 filter.
- Some notebooks stop before saved deduplication or taxonomy output. The final
  CSV is inspectable, but there is no fully reproducible end-to-end run record,
  automated test suite, or CI workflow.
- The Streamlit app can silently generate randomized synthetic data if source
  files are absent. Direct verification also found the deployment entering an
  authentication redirect loop, so it is labeled as a limited deployment link,
  not a currently open demo.
- The public collection notebook contains a committed Adzuna credential. The
  value is intentionally not reproduced here. Rotation/revocation and Git
  history cleanup are release blockers before the repository is promoted as
  safe public proof.
- Evidence required to publish a longitudinal result: a corrected date filter,
  immutable data/run manifest, pinned processed artifact, one metric
  definition, reproducible executed notebook, and dated output.

## Resume status

No resume PDF is present in the repository. The portfolio does not add a
resume link, and no resume artifact was edited.

## Live artifact status

As audited on July 31, 2026:

- PreClear AI was reachable and exposed a Maryland permit pre-check flow plus
  product/project tracking surfaces.
- The Tech Skill Demand Streamlit deployment entered an authentication redirect
  loop. The link is retained as a limited deployment artifact; the static
  GitHub Pages report returned successfully.
