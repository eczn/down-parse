import { parse, Token, CodeToken, HeaderToken, BlockToken, ParaToken, BrToken, HrToken } from "./token";

// Base AST Node Type 
export type ParaAST     =     ParaToken; 
export type BrAST       =     BrToken;
export type HrAST       =     HrToken;
export type HeaderAST   =     HeaderToken;
export type CodeAST     =     CodeToken;

// AST Type Generator 
export type GeneralAST<T, Parameter> = {
    type: T
} & Parameter;

// Recursive Node 
export type BlockAST = GeneralAST<'>' | '*' | 0, {
    block: AST[]
}>;

// AST Node Type
export type AST = ParaAST | BrAST | HrAST | BlockAST | HeaderAST | CodeAST;

/**
 * 将 Token 转为嵌套的
 * @param tokens 
 */
export function fold(tokens: Token[]): AST[] {
    const [first, ...rest] = tokens;

    if (typeof first === 'undefined') {
        return [];
    } else if (
        first.type === 'br'  ||
        first.type === '#'   ||
        first.type === '</>' ||
        first.type === 'p'   || 
        first.type === 'hr'
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

/**
 * compile text to AST
 * @param text 
 */
export function compile(text: string): AST[] {
    return fold(parse(text));
}
