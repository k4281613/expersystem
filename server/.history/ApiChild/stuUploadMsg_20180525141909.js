let models = require('../connectdata');//数据库链接信息
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
// 连接数据库
mongoose.connect(models.mongodb.url);

module.exports = router.get('/stuUploadMsg', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let Schema = mongoose.Schema;
    let mySchema = new Schema({
        stu_name: String,
        stu_id: String,
        stu_email: String
    });
    let myModel = mongoose.model('upload_msg', mySchema);
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



