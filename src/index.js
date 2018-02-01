const parse = require('./parse')
    , render = require('./render')

let mdp = text => render(parse(text)); 

mdp.parse = parse; 
mdp.render = render; 

mdp.use = function(plugin){
    // plugin.install(mdp); 
}

module.exports = mdp; 
