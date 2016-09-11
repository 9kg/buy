var path = require('path');
var express = require('express');
var cfg = require('./config/app.json');
var app = express();

// post请求的参数解析
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// cookie解析
app.use(require('cookie-parser')());

// cros
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin','*');
    next();
});

// 读取routes下文件并以对应文件名设置路由
// var routes_dir = __dirname+'/'+cfg.route;
var routes_dir = path.resolve(cfg.route);
require("fs").readdirSync(cfg.route).forEach(function(route){
    var dir = path.join('/',cfg.pro_dir, path.basename(route,'.js'));
    app.use(dir,require(path.join(routes_dir, route)));
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
    console.log(err);
    res.status(err.status || 500);
    res.json({
        status: -1,
        msg: err.message
    });
});

app.listen(cfg.port);
module.exports = app;