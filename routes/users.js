var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.get('/:id', function(req, res, next) {
    var id=schema.mongoose.Schema.Types.ObjectId(req.params.id);
    schema.Users.findOne({_id: id,type:"user"}).exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
    //let user=await userUtil.getUserInfo(id);
   // res.end(JSON.stringify(user));
});
router.get('/doctor/:id',function(req, res, next) {
    var id=schema.mongoose.Schema.Types.ObjectId(req.params.id);
    schema.Users.findOne({_id: id,type:"doctor"}).exec(function (err, data) {
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
    var newuser=new schema.User({
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
    var id=schema.mongoose.Schema.Types.ObjectId(req.params.id);
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

router.post('/update/:id',function(req, res, next){
    var id=schema.mongoose.Schema.Types.ObjectId(req.params.id);
    var session_key=req.body.session_key;
    var type=req.body.type;
    //....not complete
    schema.Users.findOne({ _id:id }, function (err, user) {
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

router.post('/all',function(req, res, next) {
    schema.Users.find().exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            console.log(data);
            res.json(data);
        }
    });
});

router.post('/test1',function(req, res, next) {

    var aaa=new schema.Users({
        "name":"路人甲",
        "age":"20",
        "gender":"男",
        "contact":"15151545415",
        "openid":"123456",
        "session_key":"123456",
        "type":"user"
    });

    aaa.save(function(err,diag){
        if(err){
            res.json(err);
            console.log(err);
        } else {
            res.json({"success": "success"});
        }
        });

    var bbb=new schema.Users({
        "name":"医生甲",
        "age":"20",
        "gender":"男",
        "contact":"1515154541555",
        "openid":"12345678",
        "session_key":"12345678",
        "type":"doctor"
    });

    bbb.save();
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

router.get('/test3',function(req, res, next) {
    console.log("aaa");
    res.render('index');
});

module.exports = router;


