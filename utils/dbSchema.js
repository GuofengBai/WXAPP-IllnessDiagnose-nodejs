var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.107:27017/illnessDiagnose');

var userSchema={
    "name":{ type: String, default: null },
    "age":{ type: String, default: null },
    "gender":{ type: String, default: null },
    "contact":{ type: String, default: null },
    "introduction":{ type: String, default: null },
    "openid":String,
    "session_key":{ type: String, default: null },
    "type":{ type: String, default: null } ,  //user,doctor
    "phoneNumber":{ type: String, default: null },
    "password":{ type: String, default: null },
    "cases":[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'cases',
        default: []
    }],
    "diagnosis":[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'diagnosis',
        default: []
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
        ref : 'diagnosis',
        default: []
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