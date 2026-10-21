# Résumé and implementation alignment — October 21, 2026

| Résumé project | Period supplied by user | Architecture now implemented on review branches |
| --- | --- | --- |
| Paper-to-Digital Invoice Intelligence Platform | Jul 2025 – Sep 2025 | Streamlit → S3 → Step Functions / Lambda → Textract → Bedrock fallback → review gate → PostgreSQL |
| Homeowner Permit Compliance Checker | Jan 2026 – Mar 2026 | Apify / Python → reviewed normalized PostgreSQL rules → FastAPI → OpenAI database tool calls → JavaScript conversation |

The new features were implemented in October 2026. Matching the described system
does not establish that these features existed during the earlier project periods.

Invoice source: `Daniel21b/invoice_pipeline`; new CDK entry is
`intelligence_app.py`. Review candidates stay in S3, not the invoice database.
Model suggestions always require review. Existing legacy deployment is retained.

Permit source: private `Daniel21b/permitsaas`; ingestion source: private
`Daniel21b/PreClear_pipeline`. The new conversational UI is `/permit-agent`.
The FastAPI service and migration are additive to the existing Next.js product.

Validation includes focused Python tests, CDK template synthesis, TypeScript
checks and isolated PostgreSQL checks for migrations, idempotency, review gates,
source coverage counting and real permit lookups. Provider calls are mocked.
AWS, OpenAI and Apify live runs and deployments remain pending.

The résumé's 50+ municipal sites figure needs the actual source manifest and a
successful reviewed import. The ingestion CLI now emits distinct source-page,
source-host and jurisdiction counts. No sources or results were invented.

`src/data/case-studies.ts` is the active homepage/projects/case-detail source.
`src/data/portfolio.ts` also serves certifications and startups. Both have been
aligned to the supplied titles and technologies. Historical unused detailed
components retain earlier architecture snapshots and are not rendered by routes.

The owner identified existing raw documents and chunks in Supabase. A read-only
check returned HTTP 402 `exceed_db_size_quota` on all three inventory tables.
This is unavailable coverage, not zero coverage. The ingestion CLI now supports
`export-supabase` and `extract-export` to reuse that data after service restoration.

Final local validation: 15 invoice tests (including CDK synthesis), 10 permit
service tests, 8 ingestion tests, portfolio ESLint/typecheck and production build,
and permit TypeScript check. PostgreSQL integration also verified API read-only
role enforcement. Cloud/provider deployment validation remains pending.
