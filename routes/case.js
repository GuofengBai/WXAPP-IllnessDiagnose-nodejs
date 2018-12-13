var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');
var formidable = require('formidable');
var fs = require('fs');

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
    var file_name=String(id)+pic_index;
    var file_path="public/images/"+file_name;

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = ("public/images/cache/");
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files){
        console.log(files.the_file);
        var filename = files.the_file.name;
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        fs.renameSync(files.the_file.path, file_path+type);
    });

    schema.Cases.findOne({_id:id }).exec(function (err, casetmp) {
        if(!error){
            casetmp.pictures.push(file_name);
            casetmp.save();
            res.json({"status":"OK"});
        }
    });


});


router.post('/images', function(req, res, next) {
    var form = formidable.IncomingForm({
        encoding : 'utf-8',//上传编码
        uploadDir : "public/files",//上传目录，指的是服务器的路径，如果不存在将会报错。
        keepExtensions : true,//保留后缀
        maxFieldsSize : 2 * 1024 * 1024//byte//最大可上传大小
    });
    var allFile=[];
    form.on('progress', function(bytesReceived, bytesExpected) {//在控制台打印文件上传进度
        var progressInfo = {
            value: bytesReceived,
            total: bytesExpected
        };
        console.log('[progress]: ' + JSON.stringify(progressInfo));
        res.write(JSON.stringify(progressInfo));
    })
        .on('file', function (filed, file) {
            allFile.push([filed, file]);//收集传过来的所有文件
        })
        .on('end', function() {
            res.end('上传成功！');
        })
        .on('error', function(err) {
            console.error('上传失败：', err.message);
            next(err);
        })
        .parse(req,function(err, fields, files){
            if(err){
                console.log(err);
            }
            allFile.forEach(function(file,index){
                var fieldName=file[0];
                var types = file[1].name.split('.');
                var date = new Date();
                var ms = Date.parse(date);
                fs.renameSync(file[1].path,form.uploadDir+"/"+types[0]+"."+String(types[types.length-1]));//重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。
            });
        });
});


module.exports = router;