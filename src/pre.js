// pre.js
module.exports = function(md){
    // 去掉开头回车
    md = md.replace(/^(\n)+/g, ''); 

    return md; 
}
