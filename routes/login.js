/*

  做api登陆认证相关

  如

  /login

  /register

  注意，网页展示的登陆认证部分用的是cookie，session，它自己做

  这里的登陆认证是基于token的，详情请搜索微信小程序wx.login原理+nodejs实现

*/
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;