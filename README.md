# down-parse 

down-parse is a markdown parser; 

# Usage 

render my markdown: 

``` js
import { render } from "down-parse";

render(`# hello, world`); 
// => <h1>hello, world</h1>
```

# Markdown AST 

You can get your markdown ast by running `compile`:

``` js
import { compile } from "down-parse"; 

compile(`# hello, world`); 
// => [ { type: '#', weight: 1, text: 'hello, world' } ]
```

AND you can write yourself the render function to render AST to HTML string.

more detail see `./src/eval.ts` and the AST `./src/compile.ts`
