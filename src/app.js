const express = require('express')
const app = express()
const controllers = require('./controllers.js')
const logger = require('./logger.js')
const configs = require('./configs.js')
const bodyParser = require('body-parser');

logger.log('Starting app')

app.get('/', function(req, res){
    res.send('Running..');
});

app.use('/message', controllers);
app.use(bodyParser.json());

app.listen(configs.port, function () {
  logger.log('AwesomeQ listening on port ' + configs.port);
})