# down-parse 

down-parse is a markdown parser; 

# Install 

``` bash
npm i --save down-parse 
```

# Usage 

``` js
const mdp = require('down-parse')
    , fs = require('fs')

// Read Markdown File 
let md = fs.readFileSync('./test.md').toString(); 

// Render It 
let html = mdp(md); 

// Print 
console.log(html); 
```

# Building ...

1. √ `<pre>` for coding
2. √ `<ol>` 
3. √ `<ul>` 
4. √ `<p>` 
5. x `<table>`
6. √ `<a>`
7. √ `<img>`

# Benchmark 

``` bash 
render 4096 times
down-parse [    Cache ]         : 88.503ms
down-parse [ No Cache ]         : 788.545ms
markdown-it                     : 606.432ms
```

# License

MIT
