/*

    连接mongodb，
    如

    getDiagnosisListOfDoctor(userid)

    getDiagnosisListOfCase(caseid)

    makeDiagnosis(diagnosis)

    等等

*/

var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.107:27017/illnessDiagnose');

var diagnosisSchema={
    "id":String,
    "case":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'case'
    },
    "doctor":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    "date":String,
    "content":String
};
var Diagnosis=mongoose.model("diagnosis",diagnosisSchema);

function getDiagnosisListOfDoctor(userid){

}

function getDiagnosisListOfCase(caseid){

}

function makeDiagnosis(diagnosis){

}