import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/core/index'],
  failOnWarn: false,
  clean: true,
  externals: [
    'vite',
  ],
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      minify: true,
    },
  },
});
