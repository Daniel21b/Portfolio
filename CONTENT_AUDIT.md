# Portfolio content audit

Audit date: July 31, 2026
Skill analytics reconciliation: August 13, 2026

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

- The public `Daniel21b/Job-Market-Analytics` repository now implements the
  Python, FastAPI, PySpark, PostgreSQL, Redis, Docker, GitHub Actions, and AWS
  EMR Serverless adapter described by this case study. The notebooks and
  Streamlit dashboard remain explicitly labeled as legacy analysis surfaces.
- The August 7, 2026 local validation ran the asynchronous API → Redis queue →
  worker → PySpark → PostgreSQL path on the checked-in 4,137-row fixture. It
  produced 4,135 canonical postings and two duplicate decisions (`0.0483%`).
- The same run produced 2,164 posting-to-skill matches across 65 distinct
  canonical skills. The portfolio does not describe the 135-pattern legacy
  role-family taxonomy as 500+ normalized skill tags.
- One optimized local Spark run completed in `17.627` seconds and recorded
  partition-skew ratios of `1.644` before and `1.060` after. Because there is
  no repeated same-input baseline series, no runtime reduction is claimed.
- A populated local benchmark sent 100 warm multi-attribute requests through
  FastAPI and recorded 100 Redis hits, `0.898 ms` p50, `1.989 ms` p95, and
  `4.013 ms` maximum latency. This is labeled development-scale, not an SLA.
- Quality gates passed for Ruff, eight non-Spark unit tests, four Spark contract
  tests, the PostgreSQL/Redis service integration test, and both Docker image
  builds.
- `120K+` postings, `18%` duplicate removal, `500+` matched skills, and the
  `40`-to-`12`-minute Spark reduction remain withheld until an immutable larger
  dataset and repeated same-input benchmark artifacts exist.
- The AWS surface is an implemented EMR Serverless adapter plus deployment and
  IAM contracts. No cloud deployment, production adoption, uptime, cost, or
  long-term service-level result is claimed.

## Resume status

No resume PDF is present in this repository. The public portfolio copy uses
the measured local results above; any separately maintained resume should use
the same evidence boundary before the next application.

## Live artifact status

As audited on July 31, 2026:

- PreClear AI was reachable and exposed a Maryland permit pre-check flow plus
  product/project tracking surfaces.
- The Tech Skill Demand Streamlit deployment is a legacy analysis surface, not
  evidence for the distributed API. The measured results come from the dated
  local validation record in the public repository.
