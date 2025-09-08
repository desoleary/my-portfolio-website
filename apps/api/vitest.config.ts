import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    swc.vite({
      jsc: {
        target: 'es2020',
        parser: { syntax: 'typescript', decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true }
      }
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    passWithNoTests: true,
    include: ['src/**/*.{spec,test}.ts', 'test/**/*.{spec,test}.ts'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['text', 'html', 'lcov']
    }
  }
})
