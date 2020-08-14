const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数
const dayjs = require('dayjs');

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    if (!body) return res.end('没有body');
    let stuId = body.stuId;
    let courseName = body.courseName;
    let classes = body.classes;
    let teaName = body.teaName;
    let myModel = $db.stuAttention;  //关注信息模型
    let myModel2 = $db.userMsg;  //用户信息模型
    let myModel3 = $db.homeAll;   //主页所有信息模型

    if (stuId && courseName && classes && teaName) {
        myModel2.find({ num: stuId }, (err, result) => {
            error(res, err);
            let jsonChange = JSON.stringify(result[0]);
            let stuName = JSON.parse(jsonChange).name;
            let doc1 = new myModel({
                stu_id: stuId,
                stu_name: stuName,
                course_name: courseName,
                classes: classes,
                tea_name: teaName,
                att_time: dayjs().format('YYYY-MM-DD')
            });
            let doc2 = new myModel3({
                content: `选择课程 : ${stuName}选择了[${courseName}]课程`,
                time: dayjs().format('YYYY-MM-DD')
            });

            myModel.find({ stu_id: stuId, course_name: courseName }, (err, result) => { //判断是否已选过该课程
                error(res, err);
                if (result.length != 0) {
                    return res.end('你已选该课程');
                } else {
                    doc1.save((err, result) => {
                        if (err) return console.log(err);
                        doc2.save((err, result) => {
                            error(res, err);
                            res.send('选课成功');
                            res.end();
                        });
                    });
                }
            });
        });
    } else {
        res.end('参数不全');
    }
};