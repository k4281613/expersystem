
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.experfile; //学生信息实例
  myModel.find({file_type:params.C_name,file_teacher:params.C_teach},{},(err, result) => {
    let mes;
    mes=result;
    console.log(mes);
    res.send({data:mes});
  });
}
