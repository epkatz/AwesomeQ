var request = require('request');


var base_url = "http://localhost:3000/message/"
var post_url = base_url + 'add'
var list_url = base_url + 'list'

console.log('Starting producer');

var post_message = function() {
    request({
        method: "POST",
        url: post_url, 
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        qs: {message: "foo"},
    },
    function (error, response, body) {
        console.log('Response: ' + body); 
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

setInterval(post_message, 1000);

//setInterval(list_message, 2000);