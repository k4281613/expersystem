
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.upload; //课程信息实例
  let option={
    $set:{
      file_name: params.fileName,
      file_sendtime: params.uploadTime
    }
  }
  myModel.update({stu_name:params.stuNum,file_classify:params.fcourse,file_name:params.fileName,classes:params.stuClass},option,function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log("update success");
      res.send(data);
    }
  });

/*  myModel.find({stu_id:params.stuNum,file_classify:params.fKind},{},(err, result) => {
    let mes;
    mes=result;
    console.log(mes);
    res.send(mes);
  });*/
}
