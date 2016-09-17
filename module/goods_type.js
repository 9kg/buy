var pool = require('../util/pool').run;

var sql_insert = 'insert into goods_type set ?';
var sql_query = 'select * from goods_type';
var sql_query_by = 'select * from goods_type where ?? like ?';

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