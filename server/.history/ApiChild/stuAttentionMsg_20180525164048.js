const models = require('../connectdata');//数据库链接信息
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const $db = require('../dbfun');//sql语句
// 连接数据库
mongoose.connect(models.mongodb.url);

module.exports = router.post('/stuAttentionMsg', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    console.log(req.body);
    let curStuId = body.curStuId;
    let myModel = $db.stuAttention; //学生关注课程实例
    myModel.find({ stu_id: curStuId }, (err, result) => {
        // console.log(result);
        res.send(result);
        res.end();
    });
});