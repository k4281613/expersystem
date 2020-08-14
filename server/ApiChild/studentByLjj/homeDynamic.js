const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let myModel = $db.comment;
    
    myModel.find({}, null, { limit: 6 }, (err, result) => {
        error(res, err);
        res.send(result);
        res.end();
    });
}