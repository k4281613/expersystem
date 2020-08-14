const $db = require('../../dbfun');//sql语句
const path = require('path');
const fs = require('fs');
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let body = req.query; //获取get传的参数
    let curClassify = body.curClassify; //当前课程分类
    let curStuId = body.curStuId; //当前学生id
    let curFileName = body.curFileName; //当前文件名
    let myModel = $db.stuAttention; //学生关注课程model
    let myModel2 = $db.download; //下载文件信息表model
    if (curClassify && curStuId && curFileName) {
        myModel.find({ stu_id: curStuId, course_name: curClassify }, (err, result) => {
            if (err) return console.error(err);
            let JsonChange = JSON.stringify(result[0]);
            let teaName = JSON.parse(JsonChange).tea_name;
            myModel2.find({
                stu_id: curStuId,
                file_classify: curClassify,
                file_name: curFileName,
                file_creater: teaName
            }, (err, result) => {
                res.send(result[0].file_url);
                res.end();
            });
        });
    } else {
        res.end('参数不全');
    }
};
