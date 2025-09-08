export const env = {
  NEST_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
  NODE_ENV: process.env.NODE_ENV || 'development'
}
export const isDev = env.NODE_ENV !== 'production'
