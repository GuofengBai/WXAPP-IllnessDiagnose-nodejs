function newDiag(){
    var caseid = $('#caseId').val();
    var content = $('#content').val();
    var time = new Date();
    var doctorid= $('#doctorId').val();
    if(!(content&&doctorid)) {
        alert('请输入全部字段！');
        return;
    }
    $.ajax({
        url : '/api/diagnosis/case/'+caseid,
        data : {
            doctorId:doctorid,
            date:time,
            content:content
        },
        dataType : 'json',
        type : 'post',
        success: function (result) {
            location.reload(true);
            alert('创建成功！');
        },
        error:function(err){
            alert('创建失败！');
        }

    });

}
