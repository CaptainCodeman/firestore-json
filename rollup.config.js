'use strict'

import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import summary from 'rollup-plugin-summary'

const production = !process.env.ROLLUP_WATCH
const appVersion = production ? `${process.env.npm_package_version}` : 'development'

console.log(`building ${appVersion}`)

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript(),
    production && terser({ compress: true, mangle: true, output: { comments: false } }),
    production && summary(),
  ],
}
