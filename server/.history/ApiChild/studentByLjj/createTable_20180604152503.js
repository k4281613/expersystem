const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数
const fs = require('fs');
const xlsx = require('node-xlsx').default;

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let body = JSON.parse(req.body);
    let stuId = body.stuId;  //学生id
    let courseName = body.courseName;  //课程名
    let shiyanName = body.shiyanName;  //实验名字
    let myModel = $db.stuAttention; //关注表model
    let myModel2 = $db.upload;  //上传表model
    myModel.find({ course_name: courseName, stu_id: stuId }, (err, result) => { //查找该课程关注的学生
        error(res, err);
        let rel = result;
        let arr = [
            ['学生学号', '姓名', '提交情况']
        ];
        for (let i of rel.keys()) {
            let jsonChange = JSON.stringify(rel[i]);
            let stuId = JSON.parse(jsonChange).stu_id;  //学生id
            let stuName = JSON.parse(jsonChange).stu_name;  //学生名字
            let teaName = JSON.parse(jsonChange).tea_name;  //老师名字
            let classes = JSON.parse(jsonChange).classes; //班级名字
            myModel2.findOne({   //检查是否有上传文件
                stu_id: stuId,
                file_classify: courseName,
                tea_name: teaName,
                classes: classes,
                file_name: shiyanName
            }, (err, result) => {
                error(res, err);
                let sureSend = null;
                if (result != null) {
                    sureSend = '已提交';
                } else {
                    sureSend = '未提交'
                }
                arr.push([
                    stuId,
                    stuName,
                    sureSend
                ]);
                // console.log("find函数里面：", arr);
                // console.log("find函数外面：", arr);
                let buffer = xlsx.build([{ name: "mySheetName", data: arr }]);
                fs.writeFileSync(
                    `${shiyanName.substring(0, shiyanName.length - 5)}.xlsx`,
                    buffer,
                    { 'flag': 'w' }
                );
                if (i == 1) {
                    res.send(`汇报表已生成`);
                    res.end();
                }
            });
        }
    });
};