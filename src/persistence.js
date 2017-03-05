const _ = require('lodash')
const util = require('./util.js')
const configs = require('./configs.js')
const logger = require('./logger.js')

var active_message_queue = [];
var pending_messages_map = new Map();
var pending_messages_queue = [];

var insert_active_message = function(message){
    logger.log('Pushing new message');
    logger.log(message);
    active_message_queue.push(message);
}

var pop_active_message = function() {
    if (active_message_queue.length > 0) {
        var msg = active_message_queue.shift();
        insert_pending_message(msg);
        logger.log('Popping next message');
        logger.log(msg);
        return msg;
    }
    return {};
}

var insert_pending_message = function(msg) {
    if (!pending_messages_map.has(msg.id)) {
        msg.delivered_time = util.get_timestamp();
        pending_messages_map.set(msg.id, msg);
        pending_messages_queue.push(msg);
        logger.log('Set pending message');
        logger.log(msg);
    }
}

var delete_pending_message = function(id) {
    if (pending_messages_map.has(id)) {
        pending_messages_map.delete(id);
        logger.log('Deleting pending message');
        logger.log(id);
    }
}

var remove_expired_pending_messages = function() {
    console.log('Pending Queue: ' + pending_messages_queue);
    var tmp_pending_messages_queue = [];
    while(pending_messages_queue.length > 0) {
        var msg = pending_messages_queue.pop();
        if (should_delete_pending_message(msg)) {
            delete_pending_message(msg.id);
        } else {
            tmp_pending_messages_queue.push(msg);
        }
    }
    pending_messages_queue = tmp_pending_messages_queue;
}

var should_delete_pending_message = function(msg) {
     var time_elapsed = util.get_timestamp() - msg.delivered_time;
     return time_elapsed > configs.expiration_time;
}

var list_active_messages = function() {
    var active_message_list = [];
    _.each(active_message_queue, function(msg){
        active_message_list.push({
            'id': msg.id,
            'timestamp': msg.timestamp
        })
    });
    console.log('Active list: ' + active_message_list);
    return active_message_list;
}

module.exports.insert = insert_active_message;
module.exports.get = pop_active_message;
module.exports.delete = delete_pending_message;
module.exports.run_job = remove_expired_pending_messages;
module.exports.list = list_active_messages;