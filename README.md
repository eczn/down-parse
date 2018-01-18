# m-d-p 

m-d-p is a markdown parser; 

# Install 

``` bash
npm i --save m-d-p 
```

# Usage 

``` js
const mdp = require('m-d-p')
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
6. x `<a>`
7. x `<img>`

# License

MIT
