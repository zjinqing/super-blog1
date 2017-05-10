/**
 * Created by Administrator on 2017/5/9.
 */
const express = require('express');
const router = express.Router();
//引入首页的路由文件
const home = require('./routes/home');
//首页
// home.index一个函数
router.get('/',home.index);



module.exports = router;