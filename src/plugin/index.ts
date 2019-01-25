export * from "./type";

import { Plugin, RenderMiddleWare, TokenMiddleWare, AfterParser } from "./type";

import { Token } from "src/token";

/**
 * Plugin Module
 */
export class PluginCtx {
    // Render Middlewares
    renders: RenderMiddleWare[] = [];

    // Token Middlewares
    parsers: TokenMiddleWare[] = [];

    // AfterParsers MiddleWare
    afterParsers: AfterParser[] = [];

    // Install A Plugin 
    use = (plugin: Plugin) => {
        const { parser, render, afterParser } = plugin;

        if (parser) {
            this.parsers.push(parser);
        }

        if (render) {
            this.renders.push(render);
        }

        if (afterParser) {
            this.afterParsers.push(afterParser);
        }
    }

    // Apply Token Middlewares 
    applyParses: TokenMiddleWare = (token, origin) => {
        return this.parsers.reduce((now, parser) => {
            return parser(now, origin);
        }, token);
    }

    // Apply Render Middlewares
    applyRenders: RenderMiddleWare = (AST_Node, defaultOutput) => {
        return this.renders.reduce((output, render) => {
            return render(AST_Node, output);
        }, defaultOutput);
    }

    // Apply AfterParser
    applyAfterParsers = (tokens: Token[]) => {
        const setToken = (newTokens: Token[]) => tokens = newTokens;

        this.afterParsers.forEach(afterParser => {
            afterParser(tokens, setToken);
        });

        return tokens;
    }
} 

// Export Down-Parse Plugin Context 
export const ctx = new PluginCtx();

// Alias For ctx.use
export const use = ctx.use; 

/**
 * For JS Develop
 * @param option Plugin Option
 */
export function createPlugin(option: Plugin) {
    return option;
}
