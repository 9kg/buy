var pool = require('../util/pool').run;

var sql_insert = 'insert into user set ?';
var sql_query = 'select * from user';
var sql_query_by = 'select * from user where ?? = ?';

// 增
function insert(fn,obj){
    pool(sql_insert, obj,fn);
}
// 查
function query(fn){
    pool(sql_query,fn);
}
module.exports = {
    insert: insert,
    query: query
};