/*

  主要做网页界面展示

*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/case/list', function getCaseList(req, res, next) {
    schema.Case.find().exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.render("case_list",{cases:data});
        }
    });
});



module.exports = router;