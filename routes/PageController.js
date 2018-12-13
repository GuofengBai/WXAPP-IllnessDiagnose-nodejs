/*

  主要做网页界面展示

*/

var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render("login");
});

router.post('/login', function(req, res, next) {
    var phone=req.body.phoneNumber;
    var password=req.body.password;
    schema.Users.findOne({phoneNumber: phone,password:password}).exec(function (err, data) {
        if(err){
            console.log(err);
            res.render("error");
        }else{
            if(user){
                req.session.userId=data._id;
                req.session.type=data.type;
                res.render("case_list",{cases:data});
            }else{
                res.json({"registered":"false"});
            }
        }
    });


});

router.get('/cases', function getCaseList(req, res, next) {
    schema.Cases.find().exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.render("case_list",{cases:data});
        }
    });
});

router.get('/user/:id/cases', function(req, res, next) {

});

router.get('/case/:id', function(req, res, next) {

});

router.post('/case/:id/diagnosis', function(req, res, next) {

});

router.get('/user/:id/info', function(req, res, next) {

});

module.exports = router;