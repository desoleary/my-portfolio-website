import base from './index.mjs'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  ...base,

  {
    name: 'env:react',
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    settings: { react: { version: 'detect' } },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { window: 'readonly', document: 'readonly' }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // Modern JSX runtime — no need for React import
      'react/react-in-jsx-scope': 'off'
    }
  },
  // Node-style globals for config files in the web app
  {
    name: 'overrides:web-config-files',
    files: ['**/next.config.*', '**/vite.config.*', '**/vitest.config.*', '**/eslint.config.*'],
    languageOptions: {
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly'
      }
    }
  },
  {
    name: 'overrides:web-tests',
    files: ['test/**/*.{ts,tsx}', 'src/**/*.{spec,test,e2e,e2e-spec}.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ]
    }
  }
]
