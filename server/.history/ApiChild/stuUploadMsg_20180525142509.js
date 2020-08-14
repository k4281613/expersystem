const models = require('../connectdata');//数据库链接信息
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const $db = require('../dbfun');//sql语句
// 连接数据库
mongoose.connect(models.mongodb.url);

module.exports = router.get('/stuUploadMsg', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let myModel = $db.upload;
    myModel.find((err, result) => { //查数据库
        console.log(result);
        res.send(result);
        res.end();
    });
    // let doc1 = new myModel({
    //     stu_name: '吴振涛',
    //     stu_id: '1540624160',
    //     stu_email: '823840745@qq.com'
    // });
    // doc1.save((err, doc) => { //插入文档
    //     console.log(doc);
    // });
});



