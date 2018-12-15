var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');
const multer = require('multer');
let path = require("path");

const page_size=20;

router.get('/', function getCaseList(req, res, next) {
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

router.get('/:id',function getCaseDetail(req, res, next) {
    var id= schema.mongoose.Types.ObjectId(req.params.id);
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

router.post('/',function createCase(req, res, next){
    var userId=req.body.userId;
    var newcase=new schema.Cases({
        "user":schema.mongoose.Types.ObjectId(req.body.userId),
        "date":req.body.date,
        "title":req.body.title,
        "content":req.body.content,
    });
    newcase.save(function(err,data){
        if(err){
            res.json({"status":"false","error":err});
            console.log(err);
        } else{
            schema.Users.findOne({_id:userId }).exec(function (err, usertmp){
                usertmp.cases.push(data._id);
                usertmp.save();
                res.json({"status":"OK","caseId":data._id});
            });
        }
    });
});

router.post('/:id/images/:pic_index', function(req, res, next) {
    var id=req.params.id;
    console.log(id);
    var pic_index=req.params.pic_index;
    var file_name=String(id)+pic_index;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '../public/images/'));
        },
        filename: (req, file, cb) => {
            cb(null, file_name+'.'+`${file.originalname.split('.').pop()}`);
            file_name=file_name+'.'+`${file.originalname.split('.').pop()}`;
        }
    });
    const uploadCfg = {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 20
        }
    };
    let upload = multer(uploadCfg).any();
    upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(req.files);
        let uploadFile = req.files[0];
    });

    schema.Cases.findOne({_id:id }).exec(function (err, casetmp) {
        if(!err){
            casetmp.pictures.push(file_name);
            casetmp.save();
            res.json({"status":"OK"});
        }
    });

});


//测试方法
router.post("/:id/upload/:pic_index", async (req, res) => {
    var id=req.params.id;
    var pic_index=req.params.pic_index;
    var file_name=String(id)+pic_index;

    const storage = multer.diskStorage({
        //文件存储位置
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '../public/images/'));
        },
        //文件名
        filename: (req, file, cb) => {
            cb(null, file_name+'.'+`${file.originalname.split('.').pop()}`);
            file_name=file_name+'.'+`${file.originalname.split('.').pop()}`;
        }
    });
    const uploadCfg = {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 20
        }
    };
    let upload = multer(uploadCfg).any();
    upload(req, res, async (err) => {
        if (err) {
            res.json({"status":"false"});
            console.log(err);
            return;
        }
        console.log(req.files);
        let uploadFile = req.files[0];
        res.json({"status":"OK"});
    });
});



module.exports = router;