
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.course; //课程信息实例
  let option={
    $set:{
      time: params.courseTime,
      stunum:params.coursePeople
    }
  }
  myModel.update({class:params.className,teaname:params.courseTeach},option,function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log("update success");
      res.send(data);
    }
  });
  //查询
  /*myModel.find({class:params.className,teaname:params.courseTeach,name:params.courseName},{},(err, result) => {
    let mes;
    mes=result;
    res.send(mes);
  });*/
}
