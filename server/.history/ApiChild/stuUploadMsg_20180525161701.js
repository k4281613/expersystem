const models = require('../connectdata');//数据库链接信息
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const $db = require('../dbfun');//sql语句
// 连接数据库
mongoose.connect(models.mongodb.url);

module.exports = router.post('/stuUploadMsg', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    if(){}
    let curStuId = body.curStuId;
    let myModel = $db.upload; //不能重复实例化两次Schema
    myModel.find({ stu_id: curStuId }, (err, result) => { //查数据库
        console.log(result);
        res.send(result);
        res.end();
    });
});



