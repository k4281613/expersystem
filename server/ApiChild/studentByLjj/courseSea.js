const $db = require('../../dbfun');//sql语句
const error = require('../../error');   //数据库错误处理函数

module.exports = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let body = JSON.parse(req.body);
    if (!body) return res.end('没有body');
    let searchText = body.searchText;
    let curPage = body.curPage; //当前页码
    let myModel = $db.course; //课程信息实例
    let size = curPage * 5; //每次拿取5条数据
    let reg = new RegExp(searchText); //生成正则表达式

    if (curPage && searchText) {
        myModel.find({ $or: [{ teaname: { $regex: reg } }, { name: { $regex: reg } }] }, null, { limit: size, skip: size - 5 }, (err, result) => {
            error(res, err);
            let rel = result;

            myModel.find({}, (err, result) => {  //获取总页数
                error(res, err);
                let count = result.length;
                let arr = [];
                arr.splice(0, arr.length); //清空数组
                for (let i of rel.keys()) { //数组整合
                    let jsonChange = JSON.stringify(rel[i]);
                    arr.push({
                        课程名: JSON.parse(jsonChange).name,
                        任课老师: JSON.parse(jsonChange).teaname,
                        课程人数: JSON.parse(jsonChange).stunum,
                        所属班级: JSON.parse(jsonChange).class
                    });
                }
                
                myModel.find({ $or: [{ teaname: { $regex: reg } }, { name: { $regex: reg } }] }, (err, result) => {  //获取总页数
                    error(res, err);
                    let count = result.length;
                    res.send({ data: arr, totalPage: Math.ceil(count / 5) });
                    res.end();
                });
            });
        });
    } else {
        res.end('参数不全');
    }
};