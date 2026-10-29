# Resume and project claim alignment

Owner clarification, October 25, 2026: the original project periods describe initial development; work resumed in October 2026. Preserve both phases. These dates do not imply uninterrupted work or that features added in October existed in the initial version.

| Project | Consistent date label |
| --- | --- |
| Job Posting Skill Demand Analyzer | Jan–Mar 2025; updated Oct 2026 |
| Invoice Intelligence Platform | Jul–Sep 2025; updated Oct 2026 |
| Homeowner Permit Compliance Checker | Jan–Mar 2026; updated Oct 2026 |

Analytics has a separately recorded August 2026 local validation. Keep that evidence date distinct from initial development and the October updates.

## Resume-ready project descriptions supported by current evidence

### Job Posting Skill Demand Analyzer Engine & REST API

Python, PySpark, FastAPI, PostgreSQL, Redis, Next.js, React, TypeScript

- Built an asynchronous Python/PySpark pipeline that normalizes job postings, identifies duplicate reposts and maps skill text into a shared taxonomy, with PostgreSQL persistence.
- Built a Next.js/React results explorer with skill/month/category filters, chart and table views, and aggregate CSV/JSON exports.
- Implemented FastAPI aggregation endpoints and Redis caching; a local 1,000-request warm-cache benchmark measured 0.738 ms p95 on the populated local database.

Optional measured processing bullet: Validated the pipeline on 500,000 real posting records, producing 411,135 canonical postings and 156,491 skill matches across 73 skills.

The October follow-up processed exactly 500,000 real records and flagged 88,865 heuristic duplicate candidates (17.77%). It matched 73 skills, not 500+. This supersedes the older fixture measurements; it does not establish historical 2025 results. See [the reproducible benchmark](https://github.com/Daniel21b/Job-Market-Analytics/blob/main/docs/BENCHMARK_2026-10-29.md).

### Paper-to-Digital Invoice Intelligence Platform

Python, PostgreSQL, AWS CDK, Lambda, Step Functions, S3, Textract, Amazon Bedrock, Streamlit

- Implemented a CDK-defined serverless invoice workflow using Step Functions, Textract and Python Lambda handlers to extract, normalize and persist validated invoice fields to PostgreSQL.
- Built a Streamlit review workflow that holds uncertain fields for correction and approval before persistence.
- Added a Bedrock fallback for missing or low-confidence fields, mapping suggestions to the invoice schema and requiring human review of model-derived values.

These describe implemented capabilities. Do not say the AWS workflow is deployed or operational until live provider and deployment verification succeeds. Current provider tests are local/mocked; original dates and October extensions are separate phases.

### Homeowner Permit Compliance Checker

Python, PostgreSQL, FastAPI, JavaScript, Apify, OpenAI

- Built Python ingestion workflows for Apify-collected municipal pages and existing Supabase documents, with source evidence, reviewed rules and a normalized PostgreSQL schema.
- Implemented FastAPI endpoints that evaluate project attributes against jurisdiction-specific permit rules and flag missing or conflicting information.
- Built an OpenAI conversational workflow that invokes read-only lookup tools and explains retrieved requirements with source links; deployed the interface in limited preview.

Do not claim 50+ normalized municipal sites until reviewed-rule coverage is counted. Raw documents/chunks are not equivalent to reviewed rules. The owner confirms Supabase storage quota remains unresolved; live authentication, database and model connections require manual activation. A contact-for-access screen does not establish live bot functionality.

## Evidence standards for numerical claims

| Claim | What establishes it |
| --- | --- |
| 500,000+ job postings processed | Versioned input manifest plus successful run counts and output reconciliation |
| 18% duplicate reposts removed | Same-run input/output counts and documented duplicate definition |
| 500+ normalized skill tags | Distinguish taxonomy capacity from distinct tags actually matched in output |
| Queries under 50 ms | Request count, p50/p95/p99, cache hit rate, hardware, concurrency and dataset size; do not imply an absolute guarantee |
| 50+ municipal sites normalized | Unique source-host inventory linked to reviewed, imported rules; report jurisdictions separately |

Professional experience dates and metrics remain owner-provided and unchanged. Be prepared to explain the baseline and measurement for 3 financial systems, about 8 hours/week saved and over 50% fewer logged errors. Project tests do not verify employer outcomes.

The original PDF has not been overwritten. A new verified-project résumé PDF is generated separately; the original PDF remains unchanged. Professional experience metrics are still owner-provided.
