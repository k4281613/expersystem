const fs = require('fs');
const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数
const qiniu = require('qiniu');
const dayjs = require('dayjs');

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    if (!body) return res.end('没有body');
    let curStuId = body.curStuId; //当前的学生id
    let curClassify = body.curClassify; //当前课程的分类
    let curTeaName = body.curTeaName; //当前课程的老师
    let curFileName = body.curFileName; //当前的文件名
    let myModel = $db.upload;  //上传表模型
    let myModel2 = $db.stuAttention;  //关注表模型
    let myModel3 = $db.homeAll;   //主页所有信息模型

    if (curStuId && curClassify && curTeaName && curFileName) {
        myModel.remove({ stu_id: curStuId, file_name: curFileName }, (err) => { //删除upload表的上传数据
            error(res, err);
            let filePath = `./stuUploadFile/${curClassify}-${curTeaName}/${curStuId}/${curFileName}`;
            fs.unlinkSync(filePath);  //删除本地文件
            const accessKey = 'Voa-weDtnRpPIqbyO37ucaNLTGsU_7tA8dladuV-';
            const secretKey = 'moQVxM1EQU-ruWSzeI8R_KcGOxsj9O7Ev0v95qbs';
            let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            let config = new qiniu.conf.Config();
            config.zone = qiniu.zone.Zone_z2;   //华南地区
            let bucketManager = new qiniu.rs.BucketManager(mac, config);
            let bucket = 'expersystem';

            myModel2.find({    //查班级名
                stu_id: curStuId,
                course_name: curClassify
            }, (err, result) => {
                error(res, err);
                let jsonchange = JSON.stringify(result[0]);
                let stuName = JSON.parse(jsonchange).stu_name;
                let classes = JSON.parse(jsonchange).classes; //班级名
                let key = `${curClassify}-${curTeaName}-${classes}-${curStuId}-${curFileName}`;  //七牛云路径

                bucketManager.delete(bucket, key, function (err, respBody, respInfo) {  //删除七牛云文件
                    if (err) {
                        console.log(err);
                        //throw err;
                    } else {
                        console.log(respInfo.statusCode);
                        console.log(respBody);
                        let doc1 = new myModel3({
                            content: `删除文件 : ${stuName}在文件夹 ${curClassify} 删除[${curFileName}]`,
                            time: dayjs().format('YYYY-MM-DD')
                        });
                        doc1.save((err, result) => {
                            error(res, err);
                            res.send('删除成功');
                            res.end();
                        });
                    }
                });
            });
        });
    } else {
        res.end('参数不全');
    }
};