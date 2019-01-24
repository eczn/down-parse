import { Token } from "../token";

import { AST } from "../compile"

/**
 * It's a middleware for you to after-process the token,
 * @param token when parse '# 123', you will get { type: '#', weight: 1, text: '123' }
 * @param token when parse '# 123', the origin will be '# 123'
 */
export type TokenMiddleWare = (token: Token, origin: string) => Token;

/**
 * When return a string, it will replace 
 * the default output of this AST_Node; 
 * When return false, runner will skip it;
 * @param AST_Node when parse '# 123' you will get 'HeaderAST'
 */
export type RenderMiddleWare = (AST_Node: AST) => string | false; 

/**
 * Your Plugin Class Should Implement This
 */
export interface Plugin {
    parser?: TokenMiddleWare,
    render?: RenderMiddleWare
}

