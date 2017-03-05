const configs = require('./configs.js')

module.exports.log = function(txt) {
    if (configs.debug) {
        console.log(txt);
        console.log('');
    }
}