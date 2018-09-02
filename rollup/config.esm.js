import { plugin as analyze } from 'rollup-plugin-analyzer';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

import pkg from '../package.json';

export default {
    input: 'src/index.js',
    output: {
        sourcemap: true,
        file: pkg.module,
        format: 'es'
    },
    external: pkg.external,
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            comments: false,
            exclude: 'node_modules/**'
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        analyze()
    ]
};