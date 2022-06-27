const { build } = require('esbuild')
const { GasPlugin } = require('esbuild-gas-plugin');

build({
  entryPoints: ['src/index.ts'],
  outbase: './src', 
  platform: 'node',
  external: [], 
  watch: false,
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [GasPlugin({parser:'acorn'})]
})
