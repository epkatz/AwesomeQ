var request = require('request');

var base_url = "http://localhost:3000/message/"
var cron_url = base_url + 'cleanup'

console.log('Starting cron job');

var run_job = function() {

    request(cron_url, function (error, response, body) {
        console.log('message: ' + body); 
    });
}

setInterval(run_job, 10000);