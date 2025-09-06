# Next.js + NestJS + GraphQL + AntD (pnpm + turbo)

- **web**: Next 14, AntD 5, Apollo Client, next-seo, sitemap/robots, Vitest
- **api**: NestJS 11, Apollo Server 4, GraphQL, TypeORM (Postgres), Faker seed, Vitest
- **shared**: Types/utilities
- Optional **Prisma** in `apps/web` as the "TypeORM equivalent for Next.js" (great fit for App Router/Route Handlers).

## Quickstart

```bash
pnpm i

# 1) Start Postgres (example via Docker)
docker run --name oh_pg -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=oh_dev -p 5432:5432 -d postgres:16

# 2) Seed some data
cd apps/api && DATABASE_URL=postgres://postgres:postgres@localhost:5432/oh_dev pnpm seed

# 3) Dev
pnpm --filter @my-portfolio/api dev   # http://localhost:4000/graphql
pnpm --filter @my-portfolio/web dev   # http://localhost:3000
```

Set `NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql` for the web app.
