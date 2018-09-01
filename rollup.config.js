import commonjs from './rollup/config.cjs';
import umd from './rollup/config.umd';
import esm from './rollup/config.esm';

export default [
    // browser-friendly UMD build
    umd,
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // the `output` option which can specify `file` and `format`)
    commonjs,
    esm
];
