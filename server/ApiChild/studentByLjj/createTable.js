const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数
const fs = require('fs');
const Promise = require('bluebird');
const xlsx = require('node-xlsx').default;

module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let body = JSON.parse(req.body);
    let courseName = body.courseName;  //课程名
    let myModel = $db.stuAttention; //关注表model
    let myModel2 = $db.upload;  //上传表model

    if (courseName) {
        myModel.find({ course_name: courseName }, null, { sort: [{ "stu_id": 1 }] }, (err, result) => { //查找该课程关注的学生
            error(res, err);
            let rel = result;
            let arr = [
                ['学生学号', '姓名', '班级', '实验名']
            ];
            for (let i of rel.keys()) {
                console.log(rel);
                let jsonChange = JSON.stringify(rel[i]);
                let stuId = JSON.parse(jsonChange).stu_id;  //学生id
                let stuName = JSON.parse(jsonChange).stu_name;  //学生名字
                let teaName = JSON.parse(jsonChange).tea_name;  //老师名字
                let classes = JSON.parse(jsonChange).classes; //班级名字

                myModel2.find({   //检查是否有上传文件
                    stu_id: stuId,
                    file_classify: courseName,
                    tea_name: teaName,
                    classes: classes,
                    // file_name: shiyanName
                }, null, { sort: [{ 'file_name': 1 }] }, (err, result) => {
                    error(res, err);
                    let rel2 = result;
                    for (let j of rel2.keys()) {
                        // let shiyanName = rel2[i].file_name;
                        arr.push([
                            rel2[j].stu_id,
                            rel2[j].stu_name,
                            rel2[j].classes,
                            rel2[j].file_name.replace(/.docx/, ""),
                        ]);
                        let buffer = xlsx.build([{ name: "mySheetName", data: arr }]);
                        fs.writeFileSync(
                            `./${courseName}实验汇总表.xlsx`,
                            buffer,
                            { 'flag': 'w' }
                        );
                        // console.log(i);
                        if (i == 1) {
                            res.send(`汇报表已生成`);
                            res.end();
                        }
                    }
                });
            }
            // res.send('汇报表创建成功');
            // res.end();
        });
    } else {
        res.end('参数不全');
    }
};
