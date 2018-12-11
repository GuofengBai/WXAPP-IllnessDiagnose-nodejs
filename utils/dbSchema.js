var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.107:27017/illnessDiagnose');

var userSchema={
    "name":String,
    "age":String,
    "gender":String,
    "contact":String,
    "introduction":String,
    "openid":String,
    "session_key":String,
    "type":String ,  //user,doctor
    "cases":[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'cases'
    }],
    "diagnosis":[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'diagnosis'
    }],
};
var Users=mongoose.model("users",userSchema);

var caseSchema={
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    "date":String,
    "title":String,
    "content":String,
    "replied":{ type: Boolean, default: false },
    "pictures":[],
    "diagnosis":[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'diagnosis'
    }]
};

var Cases=mongoose.model("cases",caseSchema);

var diagnosisSchema={
    "case":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'cases'
    },
    "doctor":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
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