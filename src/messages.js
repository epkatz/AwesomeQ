const util = require('./util.js')
const db = require('./persistence.js')
const _ = require('lodash')
const logger = require('./logger.js')

module.exports.insert_message = function(msg_txt) {
    var id = util.generate_id()
    var message = {
        'id': id,
        'text': msg_txt,
        'timestamp': util.get_timestamp()
    }
    db.insert(message);
    return id;
}

module.exports.get_message = function() {
    var msg = db.get();
    if (_.isEmpty(msg)){
        logger.log('No message to send');
        return JSON.stringify({"message": ""});
    }
    return msg;
}

module.exports.delete_message = function(id) {
    logger.log('Deleting message: ' + id);
    
    db.delete(id);
}

module.exports.run_job = function() {
    db.run_job();
}

module.exports.list_messages = function() {
    return db.list();
}