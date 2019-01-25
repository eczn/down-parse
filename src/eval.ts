import { AST, compile } from "./compile"; 

import { ctx } from "./plugin";

export function astEval(asts: AST[]): string {
    let isInCodeCtx = false;

    return asts.reduce((html, ast) => {
        let defaultOutput: string;

        if (ast.type === 'p') {
            if (isInCodeCtx) {
                return ast.text;
            } else {
                defaultOutput = `<p>${ ast.text }</p>`; 
            }
        } else if (ast.type === 'br') {
            defaultOutput = `<br />`;

        } else if (ast.type === '#') {
            const { weight, text } = ast;

            defaultOutput = `<h${ weight }>${ text }</h${ weight }>`;
        } else if (ast.type === '</>') {
            isInCodeCtx = !isInCodeCtx; 

            defaultOutput = isInCodeCtx ? 
                `<code lang=${ ast.lang }>` :
                `</code>`;
        } else if (ast.type === 0) {
            const inner = astEval(ast.block); 

            defaultOutput = `<ol type="${ ast.type }">${ inner }</ol>`;
        } else {
            const inner = astEval(ast.block);
            defaultOutput = `<ul type="${ ast.type }">${ inner }</ul>`;
        }

        return html + ctx.applyRenders(ast, defaultOutput);
    }, '') as string;
}

export function render(text: string) {
    return astEval(compile(text));
}
