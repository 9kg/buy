var pool = require('../util/pool').run;

// var user_field = ['id','name','goods_type_id','desc','price','thumbnail'].join();

var sql_insert = 'insert into goods set ?';
var sql_query = 'select g.*,gt.name as goods_type_name from goods g left join goods_type gt on g.goods_type_id = gt.id and g.status = 1';
var sql_query_by = 'select * from goods where ?? like ?';

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