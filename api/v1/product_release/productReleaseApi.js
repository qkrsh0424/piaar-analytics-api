var express = require('express');
var router = express.Router();

router.get('/list', (req, res)=>{
    res.send({
        message:200,
        data:'hello'
    })
});

module.exports = router;