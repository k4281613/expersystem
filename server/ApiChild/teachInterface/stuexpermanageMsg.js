
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  // console.log("params",params);
  let myModel = $db.experfile; //学生信息实例
  let arr=new Array();
  myModel.find({},{},(err, result) => {
    let mes;
    mes=result;
    console.log(mes);
    res.send({data:mes});
  });
}
