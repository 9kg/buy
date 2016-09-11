var pool = require('../util/pool').run;

var user_field = ['id','name','phone','create_time','update_time','avatar'].join();

var sql_insert = 'insert into user set ?';
var sql_query = `select ${user_field} from user where status = 1`;
var sql_query_by = `select ${user_field} from user where ?? like ?`;

// 增
function insert(fn,obj){
    pool(sql_insert, fn, obj);
}
// 查(list)
function query(fn){
    pool(sql_query, fn);
}
// 查(指定字段)
function query_by(fn, key, val){
    pool(sql_query_by, fn, [key,'%'+val+'%']);
}
module.exports = {
    insert: insert,
    query: query,
    query_by: query_by
};