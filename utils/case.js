/*
    连接mongodb，编写相关函数
    比如应该有类似的函数：

    getCaseList(page), 返回用户提问列表，固定页数，page指定返回第几页

    getCaseListWithQuery(query,page), 返回符合查询条件的case列表，如标题中含有关键字

    getCaseListOfUser(userid,page), 返回某用户的所有提问列表

    列表至少应包含每个提问的标题

    getCaseDetail(caseid), 根据caseid获取单个case的内容

    createCase(case)，把case写入数据库，返回结果

    等等

*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.107:27017/illnessDiagnose');

var caseSchema={
    "id":String,
    "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    "date":String,
    "title":String,
    "content":String,
    "pictures":[],
    "date":String,
    "diagnosis":{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'diagnosis'
    }
};

var Case=mongoose.model("case",caseSchema);


function getCaseList(page){

}

function getCaseListWithQuery(query,page){

}

function getCaseListOfUser(userid,page){

}


function getCaseDetail(caseid){

}

function createCase(newcase){

}