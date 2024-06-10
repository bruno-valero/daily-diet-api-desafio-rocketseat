// eslint-disable-next-line
// @ts-ignore
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globals: true,
    include: ['**/*.e2e-spec.ts'],
    environmentMatchGlobs: [['src/infra/**', 'prisma']],
  },
})
