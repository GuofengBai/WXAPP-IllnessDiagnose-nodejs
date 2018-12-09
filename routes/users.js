var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', function(req, res, next) {
    var id=req.params.id;
    schema.User.findOne({openid: id,type:"user"}).exec(function (err, data) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(data);
        }
    });
    //let user=await userUtil.getUserInfo(id);
   // res.end(JSON.stringify(user));
});
router.get('/doctor/:id',function(req, res, next) {
    var id=req.params.id;
    schema.User.findOne({openid: id,type:"doctor"}).exec(function (err, data) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(data);
        }
    });
});

router.post('/register',function(req, res, next){
    var openid=req.body.openid;
    var session_key=req.body.session_key;
    var type=req.body.type;
    var newuser=new schema.User({
        "openid":openid,
        "session_key":session_key,
        "type":type
    });
    newuser.save(function(err,data){
        if(err){
            res.send(err);
            console.log(err);
        } else{
            res.json({"success":"success"});
        }
    });
});

router.get('/registered/:id',function(req, res, next) {
    var id=req.params.id;
    schema.User.findOne({ "openid":openid }, function (err, user) {
        if(!err){
            if(user){
                res.json({"registered":"true"});
            }else{
                res.json({"registered":"false"});
            }
        }else{
            console.log(err);
        }
    });
});

router.post('/update/:id',function(req, res, next){
    var id=req.params.id;
    var session_key=req.body.session_key;
    var type=req.body.type;
    //....
    schema.User.findOne({ "openid":id }, function (err, user) {
        if(err){
            console.log(err);
        }else{
            if(type){user.type=type;}
            if(phoneNumber){user.phoneNumber=phoneNumber;}
            if(password){user.password=password;}
            user.save();
            res.json({"success":"success"});
        }
    });
});



router.get('/test1',function(req, res, next) {

    schema.User.findOne({openid: "123",type:"user"}).exec(function (err, data) {
        if(err){
            console.log(err);
        }else{
            res.send(data);
        }
    });


});

module.exports = router;


