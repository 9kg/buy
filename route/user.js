var express = require('express');
var router = express.Router();
var user = require('../module/user');

router.get('/query',(req,res,next) => {
    user.query(function(data){
        console.log(data)
        res.json(data);
    });
});
router.get('/',(req,res,next) => {
    res.json({aaa:1});
});

module.exports = router;