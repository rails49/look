import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    lib: {
      entry: 'bundle/look.bundle.ts',
      formats: ['es'],
      fileName: () => 'look.bundle.js',
    },
    outDir: 'dist',
    emptyOutDir: false,
    minify: true,
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['test/setup.ts'],
  },
});
