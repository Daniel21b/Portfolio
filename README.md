# Daniel Berhane — software and backend engineering portfolio

A Next.js and TypeScript portfolio with project case studies, architecture diagrams,
and implementation evidence. Styled with Tailwind CSS and deployed on Vercel.

## Featured projects

### Paper-to-Digital Invoice Intelligence Platform

Python, PostgreSQL, AWS CDK, S3, Step Functions, Lambda, Textract,
Amazon Bedrock and Streamlit. Textract extracts invoice fields; Bedrock proposes
missing or low-confidence fields in the same schema. Low-confidence extractions
and all model suggestions require human review before PostgreSQL persistence.

[Implementation and architecture](https://github.com/Daniel21b/invoice_pipeline)

### Homeowner Permit Compliance Checker

Python ingestion reuses municipal documents in Supabase or collects source pages
with Apify. Reviewed rules are normalized into PostgreSQL. FastAPI maps project
attributes to jurisdiction rules, and an OpenAI conversational agent calls database
lookup tools and explains retrieved requirements through a JavaScript interface.

The existing product is [PreClear](https://www.preclearai.net/). The new FastAPI
service and conversational integration still require production configuration.
Supabase's database-size quota currently prevents verifying the claimed 50+ source
sites. Invoice cloud deployment is also pending AWS deployment permissions.

## Content and validation

- `src/data/case-studies.ts`: active project descriptions, architecture, limitations.
- `src/data/portfolio.ts`: shared portfolio and startup metadata.
- [Résumé alignment](docs/RESUME_ALIGNMENT.md): implementation scope and validation.
- `src/app/`: localized Next.js pages.

The supplied project periods are Jul–Sep 2025 and Jan–Mar 2026. Features added in
October 2026 are documented separately; these additions do not establish historical
implementation dates. Descriptions distinguish implemented code from deployed
functionality and measured results.

## Run locally

```sh
git clone https://github.com/Daniel21b/Portfolio.git
cd Portfolio
npm ci
npm run dev
```

Use `.env.example` for optional service configuration. Never commit credentials.
Run `npm run typecheck`, `npm run lint`, and `npm run build` for validation.
Vercel builds the Next.js application; GitHub Pages publishes repository documentation.

## Attribution

Based on [alex289/Portfolio](https://github.com/alex289/Portfolio),
with inspiration from [leerob](https://github.com/leerob/leerob.io).
See [LICENSE](LICENSE) before reusing this repository, and replace personal content.
