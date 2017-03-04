var express = require('express')
var app = express()
var controllers = require('./controllers.js')

app.get('/', function (req, res) {
  res.send('Hello World!!')
})

app.use('/queues', controllers);

app.listen(3000, function () {
  console.log('AwesomeQ listening on port 3000!')
})