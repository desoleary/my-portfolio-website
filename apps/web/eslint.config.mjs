import reactConfig from '@my-portfolio/config/eslint/react'

export default [
  ...reactConfig,
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', '.next/**']
  }
]
