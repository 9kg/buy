var express = require('express');
var router = express.Router();
var validate = require('../util/validate');
var user = require('../module/user');

var multer  = require('multer');
var upload = multer({ limits: {fileSize: 10*1024*1024} });

router.get('/query',(req,res,next) => {
    user.query((data) => {
        res.json(data);
    });
});

router.get('/query_by',(req,res,next) => {
    user.query_by((data) => {
        res.json(data);
    }, req.query.key,req.query.val);
});

router.post('/remove',(req,res,next) => {
    user.remove((data) => {
        res.json(data);
    }, req.query.id);
});

router.post('/insert', upload.single('avatar'),(req,res,next) => {
    console.log(req.body);
    console.log(req.file);
    var obj = {
        name: req.body.name,
        phone: req.body.phone,
        avatar: "data:" + req.file.mimetype + ";base64," + req.file.buffer.toString('base64')
    };
    // 参数验证
    var arg_err = validate.get_err([{
        key:'name',
        value: req.body.name,
        exist: true,
        max_len: 15,
        min_len: 2
    }, {
        key:'phone',
        value: req.body.phone,
        exist: true,
        num: true,
        len: 11
    }]);

    if(arg_err){
        res.json({status: -3, msg: arg_err});
    }else{
        user.insert((data) => {
            res.json(data);
        }, obj);
    }

});

module.exports = router;