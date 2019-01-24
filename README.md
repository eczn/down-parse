# down-parse 

down-parse is a markdown parser with a wonderful plugin system; 

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


# Down Parse Plugin 

in down-parse, you can write your own plugin to process with Token / AST to change the default output.

Such as: 

``` js
import { render, use } from "down-parse";

use({
    parser(token) {
        // Change The ParaAST's Property To Uppercase.
        if (token.type === 'p') {
            const { text } = token; 
            token.text = text.toUpperCase(); 
        }

        // Don't Forget Return It. 
        return token;
    }, 
    
    render(ast, output) {
        if (ast.type === 'p') {
            return output.replace('WORLD', '😊');
        } else {
            // Keep Default Output For Other AST.
            return output;
        }
    }
});

const res = render(`
# I ❤️ Plugin
Hello, World
`);

console.log(res);
// => '<br /><h1>I ❤️ Plugin</h1><p>HELLO, 😊</p><br />'
```
