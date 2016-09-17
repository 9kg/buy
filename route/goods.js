var express = require('express');
var router = express.Router();
var validate = require('../util/validate');
var goods = require('../module/goods');

var multer  = require('multer');

router.get('/query',(req,res,next) => {
    goods.query((data) => {
        res.json(data);
    });
});

router.get('/query_by',(req,res,next) => {
    goods.query_by((data) => {
        res.json(data);
    }, req.query.key,req.query.val);
});

router.post('/remove',(req,res,next) => {
    goods.remove((data) => {
        res.json(data);
    }, req.query.id);
});

var thumbnail = multer({ limits: {fileSize: 50*1024} }).single('thumbnail');
router.post('/insert', (req,res,next) => {
    thumbnail(req, res, function (err) {
        if (err) {
            res.json({status: -3, msg: err && err.code});
            return;
        }else if(!req.file){
            res.json({status: -3, msg: "请上传缩略图！"});
            return;
        }

        console.log(req.body);
        console.log(req.file);

        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            goods_type_id: +req.body.goods_type_id,
            price: +req.body.price,
            stock: +req.body.stock,
            price_per: +req.body.price_per,
            img_txt_url: req.body.img_txt_url,
            banner_url: req.body.banner_url,
            thumbnail: "data:" + req.file.mimetype + ";base64," + req.file.buffer.toString('base64')
        };

        // 参数验证
        var arg_err = validate.get_err([{
                key:'name',
                value: req.body.name,
                exist: true,
                max_len: 50,
                min_len: 2
            }, {
                key:'desc',
                value: req.body.desc,
                exist: true,
                max_len: 50,
                min_len: 2
            }, {
                key:'goods_type_id',
                value: req.body.goods_type_id,
                exist: true,
                int: true,
                positive: true
            }, {
                key:'price',
                value: req.body.price,
                exist: true,
                int: true,
                positive: true
            }, {
                key:'stock',
                value: req.body.stock,
                exist: true,
                int: true,
                no_negative: true
            }, {
                key:'price_per',
                value: req.body.price_per,
                exist: true,
                int: true,
                positive: true
            }, {
                key:'img_txt_url',
                value: req.body.img_txt_url,
                exist: true
            }, {
                key:'banner_url',
                value: req.body.banner_url,
                exist: true
            }]);

        if(arg_err){
            res.json({status: -3, msg: arg_err});
        }else{
            goods.insert((data) => {
                res.json(data);
            }, obj);
        }
    });
});

module.exports = router;