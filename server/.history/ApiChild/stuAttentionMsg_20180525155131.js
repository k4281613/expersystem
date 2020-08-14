const models = require('../connectdata');//数据库链接信息
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const $db = require('../dbfun');//sql语句
// 连接数据库
mongoose.connect(models.mongodb.url);

module.exports = router.get('/stuAttentionMsg', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let myModel = $db.stuAttention; //学生关注课程实例
    myModel2.find({ stu_name: '杨子江' }, (err, result) => {
        console.log(result);
        res.send(result);
        res.end();
    });
});