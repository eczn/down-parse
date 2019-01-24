export * from "./type";

import { Plugin, RenderMiddleWare, TokenMiddleWare } from "./type";

/**
 * Plugin Module
 */
export class PluginCtx {
    // Render Middlewares
    renders: RenderMiddleWare[] = [];

    // Token Middlewares
    parsers: TokenMiddleWare[] = [];

    // Install A Plugin 
    use = (plugin: Plugin) => {
        const { parser, render } = plugin;

        if (parser) {
            this.parsers.push(parser);
        }

        if (render) {
            this.renders.push(render);
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
} 

// Export Down-Parse Plugin Context 
export const ctx = new PluginCtx();

// Alias For ctx.use
export const use = ctx.use; 
