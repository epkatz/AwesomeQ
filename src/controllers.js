var express = require('express')
var router = express.Router()


router.get('/list', function(req, res){
    res.send('This will list queues');
});



module.exports = router;