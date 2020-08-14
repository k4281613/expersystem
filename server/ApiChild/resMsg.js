const $db = require('../dbfun');//sql语句
var bluebird=require('bluebird');
var mongoose=require('mongoose');
mongoose.Promise=bluebird;
//未做重复检查，缺
module.exports =(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let params = JSON.parse(req.body);
  console.log("params",params);
  let myModel = $db.userMsg; //用户实例
  myModel.find({username:params.username},{},(err,result)=>{
    let mes;
    mes=result;
    console.log(mes.length);
    //定义promise对象
    function getUser(){
      var getResult;
      //这里使用了bluebird
      getResult=myModel.find()
        .exec()
        .then(function(promiseResult){
          // 需要将结果返回
          return promiseResult;
        })
        .error(function(error){
          return 'Promise Error:'+error;
        })
      //这个promise对象需要返回
      return getResult;
    }
    //接受promise对象
    getUser()
      .then(function(promiseData){
        console.log(promiseData.length)
        if(mes.length==0){   //没有该用户
          if(params.profession=='teacher'){
            let user=new myModel({
              name:'未命名',
              username:params.username,
              password:params.userpass,
              num:promiseData.length+1001,
              tel:params.telphone,
              age:'未知',
              sex:'未知',
              introduce:'该用户比较懒，未填写',
              hobby:'该用户比较懒，未填写',
              ptype:'teacher'
            });
            user.save(function(err,data){
              if(err){console.log(err);res.send('err')}
              else{console.log("Res:" + data);res.send('success')}
            });
          }else{
            let user=new myModel({
              name:'未命名',
              username:params.username,
              password:params.userpass,
              num:promiseData.length+1001,
              tel:params.telphone,
              age:'未知',
              sex:'未知',
              introduce:'该用户比较懒，未填写',
              hobby:'该用户比较懒，未填写',
              ptype:'stu'
            });
            user.save(function(err,data){
              if(err){console.log(err);res.send('err')}
              else{console.log("Res:" + data);res.send('success')}
            });
          }
        }else{
          res.send("fault");
        }
      })
      .error(function(error){
        console.log(error);
      })
  });
}
