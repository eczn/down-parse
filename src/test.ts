// This File Just For Test 

import * as fs from "fs";
import { compile } from "./compile";
import { render } from "./eval";

const testText = fs.readFileSync(
    `/Users/ecznlai/Desktop/code/@/down-parse/test.md`, 'utf-8'); 


const d = compile(testText); 


// d.forEach(e => {
//     console.log(e); 
// })

// console.log(d);

// console.log(d);
const text = render(d); 

console.log(text); 
// console.log(
//     JSON.stringify(d, (_, v) => v, '    ')
// )

