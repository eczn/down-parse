const { render, use } = require('./dist/dev');

use({
    afterParser(tokens, setTokens) {
        const newTokens = [];
        for (let i = 0; i < tokens.length - 1; i ++) {
            const now = tokens[i];
            const next = tokens[i + 1];

            if (now.type === 'br') {
                if (next.type !== 'br') {
                    newTokens.push(now);
                }
            } else {
                newTokens.push(now);
            }
        }

        console.log(newTokens)
        setTokens(newTokens);
    }
});

const res = render(`
# I ❤️ Plugin



pppp


p


`);

console.log('res', res);
// => '<br /><h1>I ❤️ Plugin</h1><p>HELLO, 😊</p><br />'
