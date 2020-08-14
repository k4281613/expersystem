
const $db = require('../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  // console.log("params",params);
  let myModel1 = $db.userMsg; //用户信息实例
  let arr=new Array();
  myModel1.find({username:params.username},{},(err, result) => {
    let mes;
    var i;
    mes=result;
    let jsonmes=JSON.stringify(mes);
    for(i in mes){
      arr.push(JSON.parse(jsonmes));
    }
    console.log(arr);
    res.send(arr);
  });

}
