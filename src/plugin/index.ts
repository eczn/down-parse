export * from "./type";
import { Plugin, RenderMiddleWare, TokenMiddleWare } from "./type";

export class PluginCtx {
    renders: RenderMiddleWare[] = [];
    parsers: TokenMiddleWare[] = [];

    use = (plugin: Plugin) => {
        const { parser, render } = plugin;

        if (parser) {
            this.parsers.push(parser);
        }

        if (render) {
            this.renders.push(render);
        }
    }

    applyParses: TokenMiddleWare = (token, origin) => {
        return this.parsers.reduce((now, parser) => {
            return parser(now, origin);
        }, token);
    }

    applyRenders: RenderMiddleWare = (AST_Node) => {
        for (let i = 0; i < this.renders.length; i ++) {
            const render = this.renders[i]; 

            const res = render(AST_Node);

            if (res !== false) {
                return res;    
            }
        }

        return false; 
    }
} 

export const ctx = new PluginCtx();
