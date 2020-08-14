
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.experfile; //上传信息实例
  myModel.remove({file_name:params.fileN,file_teacher:params.fileT,file_type:params.fileC},function(err,data){
    if (err) {
      console.log(err);
    } else {
      console.log("实验删除成功");
      res.send(data);
    }
  })
}
