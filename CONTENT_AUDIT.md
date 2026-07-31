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
- Reason: there is no public source, repository path, dated export, or
  measurement snapshot supporting the count.
- Evidence required to restore it: a dated, deduplicated jurisdiction export
  with source URL, jurisdiction identifier, last-seen date, and rule version.

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
