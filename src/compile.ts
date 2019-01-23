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

/**
 * 将 Token 转为嵌套的
 * @param tokens 
 */
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

export function compile(text: string) {
    return fold(parse(text));
}