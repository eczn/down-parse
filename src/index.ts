import * as fs from "fs";

const testText = fs.readFileSync(
    `/Users/ecznlai/Desktop/code/@/down-parse/test.md`, 'utf-8'); 

import { parse, Token, CodeToken, HeaderToken, BlockToken } from "./token";

export type AST_P = string; 

export type AST_Br = '';

export type GeneralAST<T, Parameter> = {
    type: T
} & Parameter;

export type BlockAST = GeneralAST<'>' | '*' | 0, {
    block: AST[]
}>;

export type HeaderAST = HeaderToken;

export type CodeAST = CodeToken;

export type AST = AST_P | AST_Br | BlockAST | HeaderAST | CodeAST;

const tokens = parse(testText); 


export function collector(list: Token[], start: number, shouldEnd: (t: Token) => boolean) {
    const ret: Token[] = []; 
    for (let i = start; i < list.length; i ++) {
        const now = list[i];
        if (shouldEnd(now)) {
            return ret; 
        } else {
            ret.push(now); 
        }
    }
    return ret;
}

// export function fold(tokens: Token[]) {
//     const list: AST[] = []; 

//     for (let i = 0; i < tokens.length; i ++) {
//         const token = tokens[i]; 
//         if (typeof token === 'string') {
//             list.push(token); 
//         } else {
//             if (token.type === '#') {
//                 list.push(token as HeaderAST);
//             } else if (token.type === '</>') {
//                 const block = collector(tokens, i + 1,
//                     t => typeof t !== 'string' && t.type === '</>');
                
//                 i = i + block.length + 1;
                

//             }
//         }
//     }
// }

export function fold(tokens: Token[]): AST[] {
    const [first, ...rest] = tokens;

    if (typeof first === 'undefined') {
        return [];
    } else if (
        typeof first === 'string' || first.type === '#' || first.type === '</>'
    ) {
        return [first, ...fold(rest)];
    } else {
        // 0 > *
        const block: BlockToken[] = [];

        for (let i = 0; i < rest.length; i ++) {
            const now = rest[i]; 

            if (typeof now === 'string' || first.type !== now.type) {
                break; 
            } else {
                block.push(now);
            }
        }
       
        return [{
            type: first.type, 
            block: fold([first, ...block].map(e => e.inner))
        }, ...fold(rest.slice(block.length))];
    }
    
}

const d = fold(tokens); 

// d.forEach(e => {
//     console.log(e); 
// })


console.log(
    d
);

console.log(
    JSON.stringify(d, (_, v) => v, '    ')
)
