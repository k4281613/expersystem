
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
   console.log("params",params);
  let myModel = $db.upload; //学生信息实例
  myModel.find({tea_name:params.fileteach,file_classify:params.fileCourse,classes
  :params.fileClass},{},(err, result) => {
    let mes;
    mes=result;
    console.log(mes);
    res.send({data:mes});
  });
}
