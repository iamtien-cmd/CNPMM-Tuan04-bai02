const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const postcss = require('rollup-plugin-postcss');

module.exports = [
  {
    input: 'src/lib/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/*.stories.tsx',
          'src/App.tsx',
          'src/index.tsx',
          'src/my-app/**/*'
        ]
      }),
      postcss({
        extract: false,
        minimize: true,
      }),
    ],
    external: ['react', 'react-dom', 'styled-components', 'framer-motion'],
  },
];