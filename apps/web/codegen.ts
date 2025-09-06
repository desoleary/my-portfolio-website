import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: []
    },
    './src/__generated__/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
};
export default config;
