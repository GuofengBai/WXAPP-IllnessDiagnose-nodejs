/*

    连接mongodn，操作user相关

    比如：

    register(openid,sessionkey,type='用户')

    checkIfRegistered(openid)

    updateUserInfo(userid,type,phoneNumber,password)

    getDoctorInfo(userid)


*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.107:27017/illnessDiagnose');

var userSchema={
    "name":{
        type: String,
        default: " "
    },
    "age":String,
    "gender":String,
    "contact":String,
    "openid":String,
    "session_key":String,
    "password":String,
    "phoneNumber":String,
    "type":{
        type: String,
        default: "user"
    } ,  //user,doctor
    "cases":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'case'
    }
};
var User=mongoose.model("user",userSchema);



function register(openid,sessionkey,type){
    var newuser=new User({
        "openid":openid,
        "session_key":sessionkey,
        "type":type
    });

    newuser.save();
}

function checkIfRegistered(openid){
    User.findOne({ "openid":openid }, function (err, user) {
        if(!err){
            if(user){
                return true;
            }else{
                return false;
            }
        }
    });
}

function updateUserInfo(openid,type,phoneNumber,password){
    User.findOne({ "openid":openid }, function (err, user) {
        if(err){
            console.log(err);
        }else{
            if(type){user.type=type;}
            if(phoneNumber){user.phoneNumber=phoneNumber;}
            if(password){user.password=password;}
            user.save();
        }
    });
}

async function getDoctorInfo(userid){
    return new Promise(function (resolve, reject) {
        User.findOne({openid: userid,type:"doctor"}).exec(function (err, data) {
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

async function getUserInfo(userid){
    return new Promise(function (resolve, reject) {
        User.findOne({openid: userid,type:"user"}).exec(function (err, data) {
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}


function test1(){
    var aaa=new User({
        "name":"str",
        "age":"str",
        "gender":"str",
        "contact":"str",
        "id":"1",
        "openid":"1",
        "session_key":"1",
        "type":"user"
    })

    aaa.save();
}

async function test2(){
    return new Promise(function (resolve, reject) {
        User.findOne({type:"user"}).exec(function (err, data) {
            if(err){
                console.log(err);
            }else{
                resolve(data);
            }
        });
    });
}

module.exports={
    test2:test2,
    register:register,
    checkIfRegistered:checkIfRegistered,
    updateUserInfo:updateUserInfo,
    getDoctorInfo:getDoctorInfo,
    getUserInfo:getUserInfo
}