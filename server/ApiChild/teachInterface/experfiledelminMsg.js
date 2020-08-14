
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.upload; //学生信息实例
  myModel.remove({stu_name:params.s_name,tea_name:params.f_teach,file_name:params.f_name,classes:params.f_class},function(err,data){
    if (err) {
      console.log(err);
    } else {
      console.log("文件删除成功");
      res.send(data);
    }
  })
}
