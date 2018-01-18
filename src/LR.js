// LR.js
module.exports = LR; 

function LR(){}

let close_table = {
    br: true
}

LR.tag2html = tag => inner => {
    if (tag){
        if (close_table[tag]) {
            return `<${tag} />`
        } else {
            return `<${tag}>${inner}</${tag}>`
        }
    } else {
        return inner; 
    }
}

LR.prototype.toMD = function(){
    let { l, r } = this.lr; 

    return l + ' ' + r; 
}

LR.prototype.toHTML = function(){
    let { outter, tag, inner, lr } = this; 
    let { l, r } = lr; 

    return LR.tag2html(tag)(inner)
}

/**
 * @description 构造函数
 * @param {Object} obj 
 */
LR.of = function(obj){
    let ins = Object.create(LR.prototype); 

    Object.assign(ins, obj); 

    return ins; 
}
