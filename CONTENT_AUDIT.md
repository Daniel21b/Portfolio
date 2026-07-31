# Portfolio content audit

Audit date: July 30, 2026

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

### Job Market Analytics

- Withheld both published job-market growth figures (`42%` and `82.4%`).
- Reason: the public README contains conflicting values for the same headline
  trend.
- Evidence required to restore a result: recomputation against a pinned
  processed dataset using one metric definition and a reproducible notebook.

## Resume status

No resume PDF is present in the repository. The portfolio does not add a
resume link, and no resume artifact was edited.

## Live artifact status

As audited on July 30, 2026:

- PreClear AI was reachable and exposed a Maryland permit pre-check flow plus
  product/project tracking surfaces.
- The Job Market Analytics Streamlit demo was asleep. The public link is
  retained and labeled as potentially needing to wake.
