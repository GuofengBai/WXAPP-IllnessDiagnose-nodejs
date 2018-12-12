var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');

const page_size=20;

router.get('/list', function getCaseList(req, res, next) {
    schema.Cases.find().populate('user','name').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.get('/list/:page', function getCaseListByPage(req, res, next) {
    var page=req.params.page;
    var skip_num=(page-1)*page_size;
    schema.Cases.find().skip(skip_num).limit(page_size).populate('user','name').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
});


router.get('/search', function getCaseListWithQuery(req, res, next) {
    var keyword=req.query.keyword;
    schema.Cases.find({title: {'$regex': keyword}}).populate('user','name').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.get('/get/:id',function getCaseDetail(req, res, next) {
    var id= schema.mongoose.Schema.Types.ObjectId(req.params.id);
    schema.Cases.findOne({_id: id}).populate('user').populate({
        path: 'diagnosis',
        populate: {path: 'doctor'}
    }).exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data);
        }
    });
});

router.post('/create',function createCase(req, res, next){
    var userId=req.body.userId;

    var newcase=new schema.Cases({
        "user":schema.mongoose.Schema.Types.ObjectId(req.body.userId),
        "date":req.body.date,
        "title":req.body.title,
        "content":req.body.content,
        "pictures":req.body.pictures
    });
    newcase.save(function(err,data){
        if(err){
            res.json({"status":"false","error":err});
            console.log(err);
        } else{
            schema.Users.findOne({_id:userId ,type:"user"}).exec(function (err, usertmp){
                usertmp.cases.push(data._id);
                usertmp.save();
                res.json({"status":"OK","caseId":data._id});
            });
        }
    });
});

router.post('/:id/images/:pic_index', function(req, res, next) {
    var id=req.params.id;
    var pic_index=req.params.pic_index;
    var file_name=String(id)+pic_index+".png";

    var imgData = req.body.imgData;
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile('public/images/'+file_name, dataBuffer, function(err) {
        if(err){
            res.send(err);
        }else{
            res.json({"status":"OK"});
        }
    });

    schema.Cases.findOne({_id:id }).exec(function (err, casetmp) {
        if(!error){
            casetmp.pictures.push(file_name);
            casetmp.save();
            res.json({"status":"OK"});
        }
    });


});



module.exports = router;