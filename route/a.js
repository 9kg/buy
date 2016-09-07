var express = require('express');
var router = express.Router();

router.get('/query',(req,res,next) => {
    res.json({aaa:111});
});
router.get('/',(req,res,next) => {
    res.json({aaa:1});
});

module.exports = router;