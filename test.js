const { render, use } = require('./dist/dev');

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

\`\`\` js
console.log(!!!);
\`\`\`

`);

console.log(res);
// => '<br /><h1>I ❤️ Plugin</h1><p>HELLO, 😊</p><br />'
