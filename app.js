var express = require('express');
var cfg = require('./config/app.json');
var app = express();

// post请求的参数解析
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cookie解析
app.use(require('cookie-parser')());

// 读取routes下文件并以对应文件名设置路由
var routes_dir = __dirname+'/'+cfg.route;
require("fs").readdirSync(routes_dir).forEach(function(route){
    app.use('/'+cfg.pro_dir+route.slice(0,-3),require(routes_dir+'/'+route));
});

// 404
app.use(function(req, res, next) {
    res.status(404);
    res.json({
        status: 0,
        msg: 'url不存在'
    });
});

// 500
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        status: -1,
        msg: err.message
    });
});

app.listen(cfg.port);
module.exports = app;