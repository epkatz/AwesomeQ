var request = require('request');
var parseJson = require('parse-json');

var base_url = "http://localhost:3000/message/"
var get_url = base_url + 'get'
var delete_url = base_url + 'delete'
var list_url = base_url + 'list'

console.log('Starting consumer');

var get_message = function() {

    request(get_url, function (error, response, body) {
        console.log('message: ' + body); 

        var response = parseJson(body);

        if (response && response.id) {
            delete_message(response.id);
        }
    });
}

var delete_message = function(msg_id) {
    request({
        url: delete_url, 
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        method: "POST",
        qs: {'id': msg_id}
    },
    function(error, response, body) {
        console.log('Deleting ' + msg_id);
        console.log('response:' + body);
    });
}

var list_message = function() {
        request(list_url, function (error, response, body) {
        console.log('VVVVVVVV');
        console.log('********');
        console.log('list: ' + body);
        console.log('********');
    });
}

setInterval(get_message, 2000);

setInterval(list_message, 5000);