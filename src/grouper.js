// grouper.js
const LR = require('./LR'); 

function find_start_end(tokens){
    let isOutter = true, start = 0, end = 0; 
    return tokens.reduce((s_e, token, idx) => {
        let { l, r } = token.lr; 

        if (l === '```'){
            if (isOutter){
                // console.log(token)
                start = idx; 
            } else {
                end = idx; 
                s_e.push({
                    start, end
                });                 
            }

            isOutter = !isOutter; 
        }

        return s_e; 
    }, []);
}

let cascade_table = {
    li: true,
    code: true
}

let groupWith = function(fn, list){
    let res = []; 
    let idx = 0; 
    let len = list.length;
    
    while (idx < len){
        let nextIdx = idx + 1; 
        while (nextIdx < len && fn(list[nextIdx - 1], list[nextIdx])){
            nextIdx = nextIdx + 1; 
        }

        let toAdd = list.slice(idx, nextIdx); 

        if (cascade_table[toAdd[0].tag]){
            res.push(
                toAdd
            ); 
        } else {
            res.push.apply(res, 
                toAdd
            ); 
        }

        idx = nextIdx; 
    }

    return res; 
}

let grouper = tokens => {
    let s_es = find_start_end(tokens); 

    let groups = s_es.map(s_e => {
        let { start, end } = s_e; 
        let group = tokens.slice(start, end + 1); 
        let firstToken = group[0]; 
        let innerLRs = group.slice(1, -1)
        let codeHeader = firstToken.lr.r; 
        let codeBody = innerLRs.map(LR => LR.toMD()).join('\n'); 

        return LR.of({
            outter: 'pre', 
            inner: codeBody, 
            tag: 'code', 
            lr: {
                l: codeHeader,
                r: codeBody
            }
        });
    });

    let codeGrouped = s_es.reduce((newTokens, s_e, idx) => {
        let next_se = s_es[idx + 1]; 

        let gap = tokens.slice(
            s_e.end + 1, next_se ? next_se.start : undefined
        ); 

        return newTokens.concat(groups[idx]).concat(gap);
    }, tokens.slice(0, s_es[0] ? s_es[0].start : undefined))

    let fn = (a, b) => (a.tag === b.tag); 
    let newTokens = groupWith(fn, codeGrouped); 
    
    return newTokens; 
}



module.exports = grouper; 
