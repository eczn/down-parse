const LR = require('./LR'); 

let type_table = {
    "#": line => {
        let { l, r } = getLR(line); 
        let header_level = l.length; 

        return LR.of({
            outter: null, 
            tag: 'h' + header_level, 
            inner: r,
            lr: { l, r }
        })
    },
    ">": line => {
        let { l, r } = getLR(line); 

        return LR.of({
            outter: null, 
            tag: 'blockquote',
            inner: r,
            lr: { l, r }
        })
    },
    "number": line => {
        let { l, r } = getLR(line);

        return LR.of({
            outter: 'ol',
            tag: 'li', 
            inner: r, 
            lr: { l, r }
        })
    },
    "-": line => {
        let { l, r } = getLR(line); 

        return LR.of({
            outter: 'ul',
            tag: 'li',
            inner: r, 
            lr: { l, r }
        })
    },
    '': line => {
        let { l, r } = getLR(line); 

        return LR.of({
            outter: null, 
            tag: 'br', 
            inner: null, 
            lr: { l, r }
        })
    },
    default: line => {
        let { l, r } = getLR(line); 

        return LR.of({
            outter: null, 
            tag: 'p',
            inner: r + l, 
            lr: { l, r }
        })
    }
}

function getLR(line){
    let bySpace = line.trim().split(' '); 
    let l = bySpace[0]; 
    let r = bySpace.slice(1).join(' '); 

    return { l, r }
}


function find(key){
    let n = parseInt(key); 

    if (Number.isNaN(n)){
        return type_table[key] || type_table['default']; 
    } else {
        return type_table['number']; 
    }
}

let mapper = {
    find, 
    getLR, 
    type_table
}

module.exports = mapper; 
