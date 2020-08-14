const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    if (!body) return res.end('没有body');
    let curStuId = body.curStuId; //当前学生的id
    let curPage = body.curPage; //当前页码
    let myModel = $db.stuAttention; //学生关注课程实例
    let size = curPage * 5; //每次拿取5条数据

    if (curStuId && curPage) {
        myModel.find({ stu_id: curStuId }, null, { limit: size, skip: size - 5 }, (err, result) => {
            error(res, err);
            let rel = result;
            let arr = [];
            arr.splice(0, arr.length); //清空数组
            for (let i of rel.keys()) {
                //数据整合
                let jsonrel = JSON.stringify(rel[i]);
                arr.push({
                    目录: JSON.parse(jsonrel).course_name,
                    大小: 0,
                    创建者: JSON.parse(jsonrel).tea_name,
                    时间: JSON.parse(jsonrel).att_time
                });
            }
            
            myModel.find({ stu_id: curStuId }, (err, result) => {  //获取总页数
                error(res, err);
                let count = result.length;
                res.send({ data: arr, totalPage: Math.ceil(count / 5) });
                res.end();
            });
        });
    } else {
        res.end('参数不全');
    }
};