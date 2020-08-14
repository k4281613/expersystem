
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.course; //课程信息实例
  myModel.remove({name:params.courseN,class:params.classN,teaname:params.courseT},function(err,data){
    if (err) {
      console.log(err);
    } else {
      console.log("班级删除成功");
      res.send(data);
    }
  })
}
