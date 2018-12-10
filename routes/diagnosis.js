var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/case/:id',function getDiagnosisListOfCase(req, res, next) {
    var caseid=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Case.find({_id: caseid}).populate("diagnosis").exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data.diagnosis);
        }
    });
});

router.post('/make',function makeDiagnosis(req, res, next){
    var diagnosis=req.body.diagnosis;

    var newdiag=new schema.Diagnosis({
        "case":schema.mongoose.Schema.Types.ObjectId(diagnosis.caseid),
        "doctor":diagnosis.schema.mongoose.Schema.Types.ObjectId(userid),
        "date":diagnosis.date,
        "content":diagnosis.content
    });
    newdiag.save(function(err,data){
        if(err){
            res.json(err);
            console.log(err);
        } else{
            res.json({"success":"success"});
        }
    });
});


module.exports = router;