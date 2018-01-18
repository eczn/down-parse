const fs = require('then-fs')
    , parse = require('./parse')
    , render = require('./render')

let mdp = text => render(parse(text)); 

module.exports = mdp; 
