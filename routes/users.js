var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');


router.get('/:id', function(req, res, next) {
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Users.findOne({_id: id}).exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.get('/:id/info', function(req, res, next) {
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Users.findOne({_id: id}).populate({
        path: 'cases',
        populate: {path: 'diagnosis'}
    }).exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.post('/:id/type',function(req, res, next){
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    var type=req.body.type;
    schema.Users.findOne({ _id:id }, function (err, user) {
        if(err){
            console.log(err);
        }else{
            if(!user.type){
                user.type=type;
                user.save();
                res.json({"status":"OK"});
            }
        }
    });
});

router.post('/:id/info',function(req, res, next){
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    var name=req.body.name;
    var age=req.body.age;
    var gender=req.body.gender;
    var contact=req.body.contact;
    var introduction=req.body.introduction;
    var type=req.body.type;
    schema.Users.findOne({ _id:id }, function (err, user) {
        if(err){
            console.log(err);
        }else{
            user.name=name;
            user.age=age;
            user.gender=gender;
            user.contact=contact;
            user.introduction=introduction;
            user.type=type;
            user.save();
            res.json({"status":"OK"});
        }
    });
});

router.post('/:id/account',function(req, res, next){
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    var phoneNumber=req.body.phoneNumber;
    var password=req.body.password;
    schema.Users.findOne({ _id:id }, function (err, user) {
        if(err){
            console.log(err);
        }else{
            user.phoneNumber=phoneNumber;
            user.password=password;
            user.save();
            res.json({"status":"OK"});
        }
    });
});

router.get('/doctor/:id',function(req, res, next) {
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Users.findOne({_id: id,type:"doctor"}).populate('diagnosis').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.post('/register',function(req, res, next){
    var openid=req.body.openid;
    var session_key=req.body.session_key;
    var type=req.body.type;
    var newuser=new schema.Users({
        "openid":openid,
        "session_key":session_key,
        "type":type
    });
    newuser.save(function(err,data){
        if(err){
            res.json(err);
            console.log(err);
        } else{
            res.json({"success":"success"});
        }
    });
});

router.get('/registered/:id',function(req, res, next) {
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Users.findOne({ _id:id }, function (err, user) {
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


router.get('/:id/case', function getCaseListOfUser(req, res, next) {
    var id=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Users.findOne({_id: id}).populate('cases').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data.cases);
        }
    });
});


router.get('/all',function(req, res, next) {
    schema.Users.find().populate('cases').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            console.log(data);
            res.json(data);
        }
    });
});

router.get('/test1',function(req, res, next) {

    var aaa=new schema.Users({
        "name":"路人丁",
        "age":"20",
        "gender":"男",
        "contact":"1515154s5415",
        "openid":"1234sdsa56",
        "session_key":"123sadsa456",
        "type":"user"
    });

    aaa.save(function(err,diag){
        if(err){
            res.json(err);
            console.log(err);
        } else {
            var case1=new schema.Cases({
                user:aaa._id,
                title:"asdada"
            });
            case1.save();

            res.json({"success": "success"});
        }
        });

});

router.get('/test2',function(req, res, next) {
    schema.Users.find({},function (err, data) {
        if(err){
            console.log(err);
        }else{
            console.log(data);
            res.json(data);
        }
    });
});

module.exports = router;


