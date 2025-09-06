FROM node:20-alpine AS base
WORKDIR /app
COPY ../../pnpm-workspace.yaml ../../package.json ../../turbo.json ../../tsconfig.base.json ./
COPY ../../packages ./packages
COPY ./package.json ./
RUN corepack enable && pnpm i --frozen-lockfile
COPY ./ .
ENV DATABASE_URL=${DATABASE_URL}
RUN pnpm build
EXPOSE 4000
CMD ["node","dist/main.js"]
