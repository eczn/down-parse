export * from "./compile";

export * from "./eval";

export * from "./token";

export * from "./plugin";

import { compile } from "./compile"; 

import { astEval } from "./eval"; 
import { ctx } from "./plugin";

export const use = ctx.use;

export function render(text: string) {
    return astEval(compile(text));
}


use({
    parser(token) {
        if (token.type === 'p') {
            const { text } = token; 
            token.text = text.toUpperCase(); 
        }

        return token;
    }
})

const res = render(`
# 123
Hello, Wolrd
`);

console.log(res);

