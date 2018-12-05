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