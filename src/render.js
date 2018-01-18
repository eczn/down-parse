// render.js
let render = tokens => {
    let html = tokens.reduce((html, token) => {
        if (Array.isArray(token)){
            let { outter } = token[0];

            return html + `<${outter}>\n` + render(token) + `</${outter}>\n`
        } else {

            return html + token.toHTML() + '\n'; 
        }
    }, ''); 

    return html; 
}

module.exports = render; 
