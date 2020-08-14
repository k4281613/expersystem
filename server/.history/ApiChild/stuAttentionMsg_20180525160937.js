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
    let stu_id = body.curStuId
    let myModel = $db.stuAttention; //学生关注课程实例
    myModel.find({ stu_name: '杨子江' }, (err, result) => {
        // console.log(result);
        res.send(result);
        res.end();
    });
});