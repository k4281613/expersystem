const $db = require('../../dbfun');//sql语句
const path = require('path');
const fs = require('fs');
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = req.query; //获取get传的参数
    let curClassify = body.curClassify; //当前课程分类
    let curStuId = body.curStuId; //当前学生id
    let curFileName = body.curFileName; //当前文件名
    // console.log(curClassify, curStuId, curFileName);
    let myModel = $db.stuAttention; //学生关注课程实例

    if (curClassify && curStuId && curFileName) {
        myModel.find({ stu_id: curStuId, course_name: curClassify }, (err, result) => {
            if (err) return console.error(err);
            let JsonChange = JSON.stringify(result[0]);
            let teaName = JSON.parse(JsonChange).tea_name;
            let filePath = './teaUploadFile';
            res.set({  //设置返回的文件格式
                "Content-type": "application/octet-stream",
                "Content-Disposition": "attachment;filename=" + encodeURI(curFileName)
            });
            // console.log(`${filePath}/${curClassify}/${teaName}/${curFileName}`);
            let shiyanFilePath = `${filePath}/${curClassify}-${teaName}/${curFileName}`;
            
            fs.exists(shiyanFilePath, (exists) => {
                if (!exists) {
                    console.log('mot ok');
                    return res.end('文件不存在');
                } else {
                    console.log(shiyanFilePath);
                    let stream = fs.createReadStream(shiyanFilePath); //老师上传的文件路径
                    stream.pipe(res);  //流传输到前端
                    stream.on('end', () => {
                        res.end();
                    });
                }
            });
        });
    } else {
        res.end('参数不全');
    }
};