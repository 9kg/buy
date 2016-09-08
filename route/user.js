var express = require('express');
var router = express.Router();
var user = require('../module/user');

router.get('/query',(req,res,next) => {
    user.query((data) => {
        res.json(data);
    });
});
router.post('/insert',(req,res,next) => {
    console.log(req.body);
    var obj = {
        name: req.body.name && req.body.name.trim(),
        phone: req.body.phone && req.body.phone.trim()
    };
    console.log(obj);
    if(!obj.name){
        res.json({status:-3, msg:'用户名不能为空'});
    }else if(obj.name.length > 15){
        res.json({status:-3, msg:'用户名太长'});
    }else if(!obj.phone){
        res.json({status:-3, msg:'手机号不能为空'});
    }else if(typeof Number(obj.phone) !== 'number' || obj.phone.length !== 11){
        res.json({status:-3, msg:'手机号格式错误'});
    }else{
        user.insert((data) => {
            res.json(data);
        }, obj);
    }
});

module.exports = router;