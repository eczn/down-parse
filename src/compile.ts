import { parse, Token, CodeToken, HeaderToken, BlockToken, ParaToken, BrToken } from "./token";

export type GeneralAST<T, Parameter> = {
    type: T
} & Parameter;

export type AST_P = ParaToken; 

export type AST_Br = BrToken;

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
        first.type === 'br' || first.type === '#' || first.type === '</>' || first.type === 'p'
    ) {
        return [first, ...fold(rest)];
    } else {
        // 0 > *
        const block: BlockToken[] = [];

        for (let i = 0; i < rest.length; i ++) {
            const now = rest[i]; 

            if (first.type !== now.type) {
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