var express = require('express');
var router = express.Router();
var formidable = require('formidable');

router.post('/images/:pic_index', function(req, res, next) {
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
        res.json({"status":"OK"});
    });

});



module.exports = router;