/**
 * Created by Administrator on 2017/5/9.
 */
const express = require('express');
const router = express.Router();
//引入首页的路由文件
const home = require('./routes/home');
//首页22
// home.index一个函数
router.get('/',home.index);
// 注册
router.get('/reg',home.reg)
//注册行为
router.post('/reg',home.postReg)
// 登陆
router.get('/login',home.login)
//登陆行为
router.post('/login',home.postLogin)
// 话题
router.get('/topic',home.topic)
//回复
router.get('/reply',home.reply)
//用户详情页面 25.148.117
router.get('/people',home.people)
//发表
router.get('/post',home.post)
//用户设置
router.get('/set',home.set)
module.exports = router;