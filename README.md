# down-parse 

down-parse is a markdown parser; 

# Usage 

render my markdown: 

``` js
import { render } from "down-parse";

render(`# hello, world`); 
// => <h1>hello, world</h1>
```

# GET AST 

``` js
import { compile } from "down-parse"; 

compile(`# hello, world`); 
// => [ { type: '#', weight: 1, text: 'hello, world' } ]
```


