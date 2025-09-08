import nodeConfig from '@my-portfolio/config/eslint/node'

export default [
  ...nodeConfig,
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**']
  }
]
