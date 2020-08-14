const fs = require('fs');

module.exports = (req, res) => {
    let body = req.query; //获取get传的参数
    console.log(body);
    let courseName = body.courseName;
    res.set({  //设置返回的文件格式
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/octet-stream",
        "Content-Disposition": "attachment;filename=" + encodeURI(`${courseName}实验汇总表.xlsx`)
    });
    let stream = fs.createReadStream(`./${courseName}实验汇总表.xlsx`); //老师上传的文件路径
    stream.pipe(res);  //流传输到前端
    stream.on('end', () => {
        res.end();
    });
}