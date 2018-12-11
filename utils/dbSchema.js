var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.107:27017/illnessDiagnose');

var userSchema={
    "name":String,
    "age":String,
    "gender":String,
    "contact":String,
    "openid":String,
    "session_key":String,
    "type":String ,  //user,doctor
    "cases":[],
    "diagnosis":[],
};
var Users=mongoose.model("users",userSchema);

var caseSchema={
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    "date":String,
    "title":String,
    "content":String,
    "pictures":[],
    "diagnosis":[]
};

var Cases=mongoose.model("cases",caseSchema);

var diagnosisSchema={
    "case":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'case'
    },
    "doctor":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    "doctor_name":String,
    "date":String,
    "content":String
};
var Diagnosis=mongoose.model("diagnosis",diagnosisSchema);

module.exports={
    userSchema:userSchema,
    Users:Users,
    caseSchema:caseSchema,
    Cases:Cases,
    diagnosisSchema:diagnosisSchema,
    Diagnosis:Diagnosis,
    mongoose:mongoose
};