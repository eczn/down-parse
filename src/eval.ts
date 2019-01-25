import { AST, compile } from "./compile"; 

import { ctx } from "./plugin";

export function astEval(asts: AST[]): string {
    return asts.reduce((html, ast) => {
        let defaultOutput: string;

        if (ast.type === 'p') {
            defaultOutput = `<p>${ ast.text }</p>`; 
        } else if (ast.type === 'br') {
            defaultOutput = `<br />`;

        } else if (ast.type === '#') {
            const { weight, text } = ast;

            defaultOutput = `<h${ weight }>${ text }</h${ weight }>`;
        } else if (ast.type === '</>') {
            defaultOutput = 
                `<pre><code class="${ ast.params.join(' ') }">${ ast.code }</code></pre>`
        } else if (ast.type === 0) {
            const inner = astEval(ast.block); 

            defaultOutput = `<ol >${ inner }</ol>`;
        } else if (ast.type === 'hr') {
            defaultOutput = `<hr />`;
        } else if (ast.type === '*') {
            const inner = astEval(ast.block);
            defaultOutput = `<ul>${ inner }</ul>`;
        } else {
            const inner = astEval(ast.block);

            defaultOutput = `<blockquote>${ inner }</blockquote>`
        }

        return html + ctx.applyRenders(ast, defaultOutput);
    }, '') as string;
}

export function render(text: string) {
    return astEval(compile(text));
}
