const { render, use, compile, parse } = require('./dist/dev');

use({
    afterParser(tokens, setTokens) {
        // const newTokens = [];
        // for (let i = 0; i < tokens.length - 1; i ++) {
        //     const now = tokens[i];
        //     const next = tokens[i + 1];

        //     if (now.type === 'br') {
        //         if (next.type !== 'br') {
        //             newTokens.push(now);
        //         }
        //     } else {
        //         newTokens.push(now);
        //     }
        // }

        // console.log(newTokens)
        // setTokens(newTokens);
    }
});

const text = require('fs').readFileSync(
    // '/Users/ecznlai/Desktop/git-rally/eczn-blog/React 中使用 Highcharts.md',
    './test.md',
    'utf-8'
);

const res = render(text); 
// res.forEach(e => console.log(e));
console.log(res);
// => '<br /><h1>I ❤️ Plugin</h1><p>HELLO, 😊</p><br />'
