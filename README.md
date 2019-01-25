# down-parse 

down-parse is a markdown parser with a wonderful plugin system; 

# example 

render my markdown: 

``` js
import { render } from "down-parse";

render(`# hello, world`); 
// => <h1>hello, world</h1>
```

# use plugin 

in down-parse, you can write your own plugin to process with Token / AST to change the default output.

such as: 

``` js
import { render, use } from "down-parse";

use({
    // (token: Token) => Token
    parser(token) {
        // Change The ParaAST's Property To Uppercase.
        if (token.type === 'p') {
            const { text } = token; 
            token.text = text.toUpperCase(); 
        }

        // Don't Forget Return It. 
        return token;
    }, 
    
    // (ast: AST, output: string) => string
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

more details see "./src/plugin/type.ts"

# what about markdown Token / AST ?

you can get your markdown ast by running `compile`:

``` js
import { compile } from "down-parse"; 

compile(`# hello, world`); 
// => [ { type: '#', weight: 1, text: 'hello, world' } ]
```

AND you can write yourself the render function to render AST to HTML string.
the mapper function from a data structure to a string)

get more details please see `./src/token.ts` for `Token` and `./src/compile.ts` for `AST`.


# License 

MIT

