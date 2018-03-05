const express = require('express');
const router = express.Router();
const home = require('../controllers/home');


/* 引入中间件  home.index 来处理'/' */
router.get('/', home.index);

//分类页
router.get('/cate/:category',home.category);

module.exports = router;
