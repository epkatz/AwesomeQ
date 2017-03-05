const moment = require('moment');
const uuidV4 = require('uuid/v4');

module.exports.get_timestamp = function() {
    return moment();
}

module.exports.generate_id = function() {
    return uuidV4();
}