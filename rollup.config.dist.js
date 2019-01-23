import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import rimraf from "rimraf";
import { uglify } from "rollup-plugin-uglify";
import config from "./build-config"; 

rimraf.sync('./dist');
rimraf.sync('./typings');

const dist = {
    input: config.entry,
    plugins: [
        json(), 
        typescript({
            useTsconfigDeclarationDir: true
        }), 
        uglify()
    ], 
    output: {
        file: config.output.dist, 
        format: 'cjs'
    }
}

const UMD = {
    input: config.entry,
    plugins: [
        json(), 
        typescript({
            // 避免 dist 重复
            tsconfigOverride: { compilerOptions: { declaration: false } }
        }), 
        uglify()
    ], 
    output: {
        name: config.name, 
        file: config.output.umd, 
        format: 'umd'
    }
}

export default [
    dist, 
    UMD
];
