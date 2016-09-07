var express = require('express');
var router = express.Router();

router.get('/query',(req,res,next) => {
    res.json({bbb:222});
});

module.exports = router;