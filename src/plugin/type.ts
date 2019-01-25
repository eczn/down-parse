import { Token } from "../token";

import { AST } from "../compile"

/**
 * it's a middleware for you to after-process the token,
 * @param token when parse '# 123', you will get { type: '#', weight: 1, text: '123' }
 * @param token when parse '# 123', the origin will be '# 123'
 */
export type TokenMiddleWare = (token: Token, origin: string) => Token;

/**
 * when return a string, it will replace 
 * the default output of this AST_Node; 
 * when return false, runner will skip it;
 * @param AST_Node when parse '# 123' you will get 'HeaderAST'
 */
export type RenderMiddleWare = (AST_Node: AST, output: string) => string; 

export type AfterParser = (
    /**
     * The Tokens Parsed 
     */
    tokens: Token[],

    /**
     * you can replace the tokens by RUNNING setTokens
     */
    setTokens: (newTokens: Token[]) => void
) => void;

/**
 * Your Plugin Class Should Implement This
 */
export interface Plugin {
    // the parser will be INVOKED one by one
    parser?: TokenMiddleWare,

    // the render will be INVOKED one by one 
    render?: RenderMiddleWare,

    // the function invoked when down-parse finish token parse
    afterParser?: AfterParser
}
