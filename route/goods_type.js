var express = require('express');
var router = express.Router();
var validate = require('../util/validate');
var goods_type = require('../module/goods_type');


router.get('/query',(req,res,next) => {
    goods_type.query((data) => {
        res.json(data);
    });
});

router.get('/query_by',(req,res,next) => {
    goods_type.query_by((data) => {
        res.json(data);
    }, req.query.key,req.query.val);
});

router.post('/remove',(req,res,next) => {
    goods_type.remove((data) => {
        res.json(data);
    }, req.query.id);
});

router.post('/insert', (req,res,next) => {
    console.log(req.body);
    console.log(req.file);

    var obj = {
        name: req.body.name
    };

    // 参数验证
    var arg_err = validate.get_err([{
            key:'name',
            value: req.body.name,
            exist: true,
            max_len: 50,
            min_len: 2
        }]);

    if(arg_err){
        res.json({status: -3, msg: arg_err});
    }else{
        goods_type.insert((data) => {
            res.json(data);
        }, obj);
    }
});

module.exports = router;