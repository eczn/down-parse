import config from "./build-config"; 

import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

export default [
    {
        input: config.entry,
        plugins: [
            json(), 
            typescript({
                tsconfig: 'tsconfig.json', 
                tsconfigOverride: { compilerOptions: { declaration: false } }
            }), 
            // serve('dist')
        ], 
        output: {
            file: config.output.dev, 
            format: 'cjs'
        }, 
        watch: {
            chokidar: true, 
            clearScreen: true, 
            include: 'src/**'
        }
    }
];
