const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    let stuId = body.stuId;
    let content = body.content;
    let myModel = $db.comment;
    let myModel2 = $db.userMsg;

    if (stuId && content) {
        myModel2.find({ num: stuId }, (err, result) => {
            let jsonchange = JSON.stringify(result[0]);
            let stuName = JSON.parse(jsonchange).stu_name;
            let date = new Date();
            let time = `${date.getFullYear()}-${date.getMonth() < 10 ? 0 : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? 0 : ''}${date.getDate()}`;
            let doc1 = new myModel({
                stu_id: stuId,
                stu_name: stuName,
                content: content,
                sendtime: time
            });

            doc1.save((err, result) => {
                error(res, err);
                myModel.find({}, null, { limit: 6 }, (err, result) => {
                    res.send({ msg: '发送成功', data: result });
                    res.end();
                });
            });
        });
    } else {
        res.end('参数不全');
    }
}