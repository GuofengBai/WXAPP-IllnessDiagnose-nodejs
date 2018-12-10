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

const appid="aaa";
const secret="sec";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login/:code', function(req, res, next) {
  var res_code=req.params.code;
  var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + 'secret=' + secret + 'js_code=' + res_code + 'grant_type=authorization_code';
    request({
        url: l,
        data: {},
        method: 'GET',
        success: function (response) {
          console.log(response);

          //checkifregistered
            // register
          res.json(response);
        }
    });
});



module.exports = router;