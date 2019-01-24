import { AST } from "./compile"; 
import { ctx } from "./plugin";

export function astEval(asts: AST[]): string {
    let isInCodeCtx = false;

    return asts.reduce((html, ast) => {
        const t = ctx.applyRenders(ast);
        if (t !== false ) {
            return t;
        }

        if (typeof ast === 'string') {
            return html + `<p>${ast}</p>`; 
        } else if (ast.type === '#') {
            const { weight, text } = ast;

            return html + `<h${ weight }>${ text }</h${ weight }>`;
        } else if (ast.type === '</>') {
            isInCodeCtx = !isInCodeCtx; 

            if (isInCodeCtx) {
                return html + `<code lang=${ ast.lang }>`;
            } else {
                return html + `</code>`;
            }
        } else if (ast.type === 0) {
            const inner = astEval(ast.block); 

            return html + `<ol type="${ ast.type }">${ inner }</ol>`;
        } else {
            const inner = astEval(ast.block);

            return html + `<ul type="${ ast.type }">${ inner }</ul>`
        }
    }, '') as string;
}
