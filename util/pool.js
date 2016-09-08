var mysql = require('mysql');

// config 下的 pool.json 示例
// {
//     "connectionLimit": 10,
//     "host": "host",
//     "user": "user",
//     "password": "password",
//     "database": "database",
//     "charset": "utf8mb4"
// }
var pool = mysql.createPool(require('../config/pool.json'));
var pool_query = pool.query.bind(pool);

function run(sql,fn,arg) {
    var callback = function(err, result, fields) {
        if (err) {
            fn({status: -2, msg: "操作失败", data: err});
        }else{
            fn({status: 1, msg: "操作成功", data: result});
        }
    }
    arg ? pool_query(sql,arg,callback) : pool_query(sql,callback);
}
module.exports = {
    run: run
};
