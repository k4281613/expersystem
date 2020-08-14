const $db = require('../../dbfun');//sql语句
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const qiniu = require('qiniu');
const error = require('../../error');   //数据库错误处理函数
const dayjs = require('dayjs');

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const form = new formidable.IncomingForm();
    form.uploadDir = './stuUploadFile';
    form.keepExtensions = true;  //上传文件是否带后缀值
    form.parse(req, (err, fields, files) => {
        let curClassify = fields.curClassify; //当前课程分类
        let curTeaName = fields.curTeaName; //当前老师名字
        let curStuId = fields.curStuId; //当前学生id
        let filePath = './stuUploadFile';

        if (!fs.existsSync(`${filePath}/${curClassify}-${curTeaName}/`)  //判断目录是否存在，目录不存在则创建项目
            && !fs.existsSync(`${filePath}/${curClassify}-${curTeaName}/${curStuId}/`)
        ) {
            fs.mkdirSync(`${filePath}/${curClassify}-${curTeaName}/`);  //创建课程目录
            fs.mkdirSync(`${filePath}/${curClassify}-${curTeaName}/${curStuId}/`);
        }

        let oldpath = `./` + files.stuUploadFile.path; //旧地址
        let newpath = `${filePath}/${curClassify}-${curTeaName}/${curStuId}/${files.stuUploadFile.name}`;  //新地址
        fs.renameSync(oldpath, newpath);    //文件改名
        let myModel = $db.upload; //上传信息model 
        let myModel2 = $db.userMsg;  //学生信息model
        let myModel3 = $db.stuAttention; //学生关注信息model
        let myModel4 = $db.download;  //下载信息
        let myModel5 = $db.homeAll; //主页所有信息

        myModel2.find({ num: curStuId }, (err, reuslt) => {
            error(res, err);
            let JsonChange = JSON.stringify(reuslt[0]);
            let stuName = JSON.parse(JsonChange).name;  //当前学生姓名
            let date = new Date();
            //上传文件到七牛云
            const accessKey = 'Voa-weDtnRpPIqbyO37ucaNLTGsU_7tA8dladuV-';
            const secretKey = 'moQVxM1EQU-ruWSzeI8R_KcGOxsj9O7Ev0v95qbs';
            let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            let bucket = 'expersystem';  //七牛云上传空间
            //七牛云配置信息
            let options = {
                scope: bucket,
                expire: 7200, //上传凭证有效时间
                returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","fname":$(fname),"mimeType":$(mimeType),"ext":$(ext)}', //回调内容，具体看七牛云官方文档
            };
            let putPolicy = new qiniu.rs.PutPolicy(options);
            let uploadToken = putPolicy.uploadToken(mac);
            let config = new qiniu.conf.Config();
            config.zone = qiniu.zone.Zone_z2; //华南地区
            let localFile = newpath;  //本地文件
            let formUploader = new qiniu.form_up.FormUploader(config);
            let putExtra = new qiniu.form_up.PutExtra();

            myModel3.find({     //查找当前班级
                stu_id: curStuId,
                course_name: curClassify,
                tea_name: curTeaName
            }, (err, result) => {
                error(res, err);
                let curClass = result[0].classes;

                myModel4.find({    //查找当前课件的创建时间
                    file_classify: curClassify,
                    file_name: files.stuUploadFile.name,
                    file_creater: curTeaName,
                    classes: curClass
                }, (err, result) => {
                    error(res, err);
                    // if (result.length == 0) {  //如果老师没有上传该实验
                    //     fs.unlinkSync(newpath); //删除本地文件并终止上传到七牛云
                    //     return res.end('老师没有上传该实验!');
                    // }
                    let s1 = result[0].file_sendtime;  //获取实现报告创建的时间
                    let s2 = dayjs(s1).add(7, 'day');
                    if (dayjs().isAfter(s2)) return res.end('上传时间已经超过了');  //判断上传时间是否过期

                    let key = `${curClassify}-${curTeaName}-${curClass}-${curStuId}-${files.stuUploadFile.name}`;  //七牛云路径
                    const qiniuUrl = 'http://p9hnx9ad0.bkt.clouddn.com';    //七牛云的域名
                    let uploadfilePath = qiniuUrl + '/' + key;     //文件上传后的地址赋值
                    console.log("文件上传后的地址", uploadfilePath);
                    // 文件上传
                    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,  //上传到七牛云
                        respBody, respInfo) {
                        if (respErr) {
                            throw respErr;
                        }
                        if (respInfo.statusCode == 200) {

                            // let time = `${date.getFullYear()}-${date.getMonth() < 10 ? 0 : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? 0 : ''}${date.getDate()}`;
                            let doc1 = new myModel({  //向upload表插入数据
                                stu_id: curStuId,  //学生id
                                stu_name: stuName, //学生名字
                                tea_name: curTeaName,
                                classes: curClass,
                                file_classify: curClassify, //文件分类
                                file_name: files.stuUploadFile.name,   //文件名
                                file_url: uploadfilePath,
                                file_size: (files.stuUploadFile.size / 1024).toFixed(1) + 'kb',  //文件大小
                                file_creater: stuName, //文件创建者
                                file_sendtime: dayjs().format('YYYY-MM-DD')
                            });
                            let doc2 = new myModel5({
                                content: `上传文件 : ${stuName}在文件夹 ${curClassify} 分享[${files.stuUploadFile.name}]`,
                                time: dayjs().format('YYYY-MM-DD')
                            });

                            doc1.save((err, reuslt) => {  //保存上传信息
                                error(res, err);
                                doc2.save((err, result) => {  //保存主页所有信息
                                    error(res, err);
                                    res.send('上传成功');
                                    res.end();
                                });
                            });

                        } else {
                            console.log(respInfo.statusCode);
                            console.log(respBody);
                        }
                    });
                });
            });
        });
    });
};