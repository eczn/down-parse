// test.js
const mdp = require('./src/index')
    , fs = require('then-fs')
    , mark_it = require('markdown-it')();



let text = fs.readFileSync('./test.md').toString(); 
let N = 4096;  

console.log(`render ${N} times`); 

console.time(`down-parse [    Cache ]`.padEnd(32));
let syntaxes = mdp.parse(text); 
for (let i = 0; i < N; i ++){
    mdp.render(syntaxes); 
}
console.timeEnd(`down-parse [    Cache ]`.padEnd(32));

console.time(`down-parse [ No Cache ]`.padEnd(32));
for (let i = 0; i < N; i ++){
    mdp(text); 
}
console.timeEnd(`down-parse [ No Cache ]`.padEnd(32));

console.time(`markdown-it`.padEnd(32));
for (let i = 0; i < N; i ++){
    mark_it.render(text); 
}
console.timeEnd(`markdown-it`.padEnd(32)); 

