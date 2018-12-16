/*

  主要做网页界面展示

*/

var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');
var request = require('request');
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
    schema.Users.findOne({phoneNumber: phone,password:password}).populate('cases').exec(function (err, data) {
        if(err){
            console.log(err);
            res.render("error");
        }else{
            if(user){
                req.session.userId=data._id;
                req.session.type=data.type;
                if(user.type=="医生"){
                    res.redirect("/page/cases");
                }else{
                    res.render("my_case",{cases:data.cases});
                }

            }else{
                res.json({"registered":"false"});
            }
        }
    });


});

router.get('/cases', function getCaseList(req, res, next) {
    schema.Cases.find().populate('user').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.render("case_list",{cases:data});
        }
    });
});

router.get('/user/:id/cases', function(req, res, next) {
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Users.findOne({_id: id}).populate('cases').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.render("my_case",{cases:data.cases});
        }
    });
});

router.get('/case/:id', function(req, res, next) {
    var id= schema.mongoose.Types.ObjectId(req.params.id);
    var doctor=req.session.userId;
    schema.Cases.findOne({_id: id}).populate('user').populate({
        path: 'diagnosis',
        populate: {path: 'doctor'}
    }).exec(function (err, data) {
        if(err){
            res.render(err);
        }else{
            res.render('case_detail',{caseitem:data,doctor:doctor});
        }
    });
});

router.post('/case/:id/diagnosis', function(req, res, next) {

});

router.get('/user/:id/info', function(req, res, next) {

});

module.exports = router;