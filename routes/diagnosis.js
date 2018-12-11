var express = require('express');
var router = express.Router();
var schema=require('../utils/dbSchema');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/case/:id',function getDiagnosisListOfCase(req, res, next) {
    var caseid=schema.mongoose.Types.ObjectId(req.params.id);
    schema.Cases.find({_id: caseid}).populate('diagnosis').exec(function (err, data) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            res.json(data.diagnosis);
        }
    });
});

router.post('/case/:id',function makeDiagnosis(req, res, next){
    var content=req.body.content;
    var date=req.body.date;
    var doctorId=schema.mongoose.Types.ObjectId(req.body.doctorId);
    var caseId=schema.mongoose.Types.ObjectId(req.params.caseId);

    schema.Users.findOne({_id:doctorId ,type:"doctor"}).exec(function (err, doctor) {
        if(err){
            console.log(err);
            res.json(err);
        }else{
            var newdiag=new schema.Diagnosis({
                "case":schema.mongoose.Schema.Types.ObjectId(caseId),
                "doctor":schema.mongoose.Schema.Types.ObjectId(doctorId),
                "date":date,
                "content":content
            });
            newdiag.save(function(err,diag){
                if(err){
                    res.json(err);
                    console.log(err);
                } else{
                    doctor.diagnosis.push(diag._id);
                    doctor.save();
                    schema.Cases.findOne({_id:caseId }).exec(function (err, casetmp) {
                        if(!error){
                            casetmp.diagnosis.push(diag._id);
                            casetmp.replied=true;
                            casetmp.save();
                            res.json({"status":"OK"});
                        }
                    });
                }
            });
        }
    });

});


module.exports = router;