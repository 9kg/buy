var mysql = require('mysql');

// pool.json
// {
//     "connectionLimit": 10,
//     "host": "host",
//     "user": "user",
//     "password": "password",
//     "database": "database",
//     "charset": "utf8mb4"
// }
var pool = mysql.createPool(require('../config/pool.json'));

function run(sql,fn,arg) {
    var query_args = [sql,function(err, result, fields) {
            if (err) {
                fn({ status: -2, msg: "操作失败", data: err });
            } else {
                fn({ status: 1, msg: "操作成功", data: result });
            }
        }];
    arg && query_args.splice(1,0,arg);

    pool.query.apply(pool,query_args);

}
module.exports = {
    run: run
};
