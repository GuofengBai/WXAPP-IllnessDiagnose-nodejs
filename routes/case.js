var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');

const page_entries=20;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function getCaseList(req, res, next) {
    var id=req.params.id;
    schema.User.find().exec(function (err, data) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(data);
        }
    });
});

router.get('/search/:keyword', function getCaseListWithQuery(req, res, next) {
    var keyword=req.params.keyword;
    schema.Case.find({title: {'$regex': keyword}}).exec(function (err, data) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(data);
        }
    });
});

router.get('/user/:id', function getCaseListOfUser(req, res, next) {
    var id=req.params.id;
    schema.User.findOne({openid: id}).populate('cases').exec(function (err, data) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(data.cases);
        }
    });
});

router.get('/:id',function getCaseDetail(req, res, next) {
    var id= schema.mongoose.Schema.Types.ObjectId(req.params.id);
    schema.Case.findOne({_id: id}).populate("user").populate("diagnosis").exec(function (err, data) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(data);
        }
    });
});

router.post('/create',function createCase(req, res, next){
    var casetmp=req.body.case;

    var newcase=new schema.Case({
        "user":casetmp.userid,
        "date":casetmp.date,
        "title":casetmp.title,
        "content":casetmp.content,
        "pictures":casetmp.pictures
    });
    newcase.save(function(err,data){
        if(err){
            res.send(err);
            console.log(err);
        } else{
            res.json({"success":"success"});
        }
    });
});

module.exports = router;