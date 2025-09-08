import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import prettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  ...tsEslint.configs.recommended,

  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/coverage/**',
      '**/*.tsbuildinfo',
      '**/next-env.d.ts'
    ]
  },

  {
    name: 'base:plugins+rules',
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports
    },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
        node: true
      }
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': false }],
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
          pathGroups: [
            { pattern: '@components/**', group: 'internal', position: 'after' },
            { pattern: '@graphql/**', group: 'internal', position: 'after' },
            { pattern: '@shared/**', group: 'internal', position: 'after' }
          ],
          pathGroupsExcludedImportTypes: ['builtin']
        }
      ]
    }
  },

  prettier
]
