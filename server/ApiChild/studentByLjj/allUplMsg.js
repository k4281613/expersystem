const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    let stuId = body.stuId;
    let myModel = $db.upload;

    if (stuId) {
        myModel.find({ stu_id: stuId }, (err, result) => {
            error(res, err);
            res.send(result);
            res.end();
        });
    }
}