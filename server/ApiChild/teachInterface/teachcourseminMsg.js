
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.course; //学生信息实例
  myModel.find({teaname:params.myteach,name:params.minCourseName},{},(err, result) => {
    let mes;
    mes=result;
    console.log(mes);
res.send({data:mes});
});
}
