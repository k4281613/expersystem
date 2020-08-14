
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.course; //学生信息实例
  myModel.find({name:params.courseName},{},(err, result) => {
    let mes;
    mes=result;
    if(mes.length!=0){
      console.log('该课程已存在');
      console.log(mes);
      res.send({data:"fault"});
    }else{
      console.log('正在存储数据');
      let course=new myModel({
        teaname: params.courseTeach,
        name: params.courseName,
        stunum: params.coursePeople,
        num: Math.round(Math.random()*1000+1),
        class: params.courseClass,
        time: params.courseTime,
        address:params.coursePlace
      });
      course.save(function(err,data){
        if(err){console.log(err);}
        else{
          console.log("Res:" + data);console.log("课程存储成功");
          res.send({message:data});}
      });
    }
  });
}
