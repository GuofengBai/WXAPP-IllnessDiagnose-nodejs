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
    "cases":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'case'
    }
};
var User=mongoose.model("user",userSchema);

var caseSchema={
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    "date":String,
    "title":String,
    "content":String,
    "pictures":[],
    "diagnosis":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'diagnosis'
    }
};

var Case=mongoose.model("case",caseSchema);

var diagnosisSchema={
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

module.exports={
    userSchema:userSchema,
    User:User,
    caseSchema:caseSchema,
    Case:Case,
    diagnosisSchema:diagnosisSchema,
    Diagnosis:Diagnosis,
    mongoose:mongoose
}