var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/case/:id',function getDiagnosisListOfCase(req, res, next) {
    var caseid=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Cases.find({_id: caseid}).exec(function (err, data) {
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
    var doctor_name="";

    schema.Users.findOne({_id: diagnosis.doctor,type:"doctor"}).exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            doctor_name=data.name;
            var newdiag=new schema.Diagnosis({
                "case":schema.mongoose.Schema.Types.ObjectId(diagnosis.caseid),
                "doctor":schema.mongoose.Schema.Types.ObjectId(diagnosis.doctor),
                "doctor_name":doctor_name,
                "date":diagnosis.date,
                "content":diagnosis.content
            });
            newdiag.save(function(err,diag){
                if(err){
                    res.json(err);
                    console.log(err);
                } else{
                    res.json({"success":"success"});
                }
            });

        }
    });


});


module.exports = router;