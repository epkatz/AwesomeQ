const express = require('express')
const router = express.Router()
const service = require('./messages.js')
const logger = require('./logger')


router.get('/list', function(req, res){
    var msgs = service.list_messages(); 
    res.send(msgs);
});

router.post('/add', function(req, res) {
    logger.log('Requesing adding a message');
    
    var body = req.query.message;

    var id = service.insert_message(body);

    console.log('Responding with ' + id);
    res.send({'id': id});
});

router.get('/get', function(req, res){
    res.send(service.get_message());
});

router.post('/delete', function(req, res){
    logger.log('Requesing deleting a message');

    var id = req.query.id;

    service.delete_message(id);

    res.send({'success': 'true'});
});

router.get('/cleanup', function(req, res){
    logger.log('Start pending cleanup');
    
    service.run_job();

    res.send({'success': 'true'});
});

module.exports = router;