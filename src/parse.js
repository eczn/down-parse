const mapper = require('./mapper')
    , grouper = require('./grouper')
    , pre = require('./pre')

module.exports = function(md){
    md = pre(md); 

    let byEnter = md.split('\n').map(
        line => line.trim()
    );

    byEnter = byEnter.filter((now, idx, its) => {
        let nextIdx = idx + 1, len = its.length;

        if (now === "") {
            if (nextIdx < len){              
                return !(its[nextIdx] === "")
            } else { 
                return true; 
            }
        } else {
            return true; 
        }
    }); 
  
    let tokens = byEnter.map(line => {
        let firstChar = line[0] || line; 

        let tokenProc = mapper.find(firstChar); 
        
        return tokenProc(line); 
    });

    // fold 
    let isOutter = true, start = 0, end = 0; 
    let s_e = tokens.reduce((s_e, token, idx) => {
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


    let lastTokens = grouper(tokens); 
    
    return lastTokens; 
}
