const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // let body = JSON.parse(req.body);
    // let stuId = body.stuId;
    let myModel = $db.homeAll;
    myModel.find({}, null, {  //查询当前学生的上传信息
        limit: 6,
        sort: [{ 'time': -1 }]
    }, (err, result) => {
        error(res, err);
        res.send(result);
        res.end();
    });
}