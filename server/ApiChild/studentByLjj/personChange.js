const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    let stuId = body.stuId;
    let mymodel = $db.userMsg;
    let mymodel2 = $db.stuAttention;
    let mymodel3 = $db.comment;
    let mymodel4 = $db.upload;
    mymodel.find({ num: stuId }, (err, result) => {   //查询当前的默认信息
        error(res, err);
        let username = body.username || result[0].name;
        let phoneNumber = body.phoneNumber || result[0].tel;
        let sex = body.sex || result[0].sex;
        let email = body.email || result[0].email;
        let signature = body.signature || result[0].instoduce;
        let updates = {
            $set: {
                name: username,
                tel: phoneNumber,
                sex: sex,
                email: email,
                introduce: signature
            }
        };
        let updates2 = {
            $set: {
                stu_name: username
            }
        };
        let updates3 = {
            $set: {
                stu_name: username,
                file_creater: username
            }
        };
        mymodel.update({ num: stuId }, updates, { multi: true }, (err, result) => {  //更新设置的最新信息
            error(res, err);
            mymodel2.update({ stu_id: stuId }, updates2, { multi: true }, (err, result) => {
                error(res, err);
                mymodel3.update({ stu_id: stuId }, updates2, { multi: true }, (err, result) => {
                    error(res, err);
                    mymodel4.update({ stu_id: stuId }, updates3, { multi: true }, (err, result) => {
                        error(res, err);
                        mymodel.find({ num: stuId }, (err, result) => {  //返回当前最新的信息
                            error(res, err);
                            res.send({ msg: "修改成功", data: result });
                            res.end();
                        });
                    });
                });
            });
        });
    });
}