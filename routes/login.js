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
var request = require('request');
var schema=require('../utils/dbSchema');

const appid="aaa";
const secret="sec";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  var res_code=req.body.code;
  var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + 'secret=' + secret + 'js_code=' + res_code + 'grant_type=authorization_code';
  request({
        url: l,
        data: {},
        method: 'GET',
        success: function (response) {
            console.log(response);
            //checkifregistered

            var openId=res.data.openid;
            var session_key="aaa";
            schema.Users.findOne({ openid:openId }, function (err, user) {
                if(!err){
                    if(user){
                        if(user.type){
                            res.json({
                                "id":user._id,
                                "type":user.type,
                                "hasType":true,
                            });
                        }else{
                            res.json({
                                "id":user._id,
                                "hasType":false,
                            });
                        }
                    }else{
                        var newuser=new schema.Users({
                            "openid":openId,
                            "session_key":session_key
                        });
                        newuser.save(function(err,data){
                            if(err){
                                res.json(err);
                                console.log(err);
                            } else{
                                res.json({
                                    "id":data._id,
                                    "hasType":false,
                                });
                            }
                        });
                    }
                }else{
                    console.log(err);
                }
            });
        }
    });
});

router.post('/test1', function(req, res, next) {
    var aaa=req.body;
    console.log(aaa.name);
    res.json(aaa.name);

});


module.exports = router;