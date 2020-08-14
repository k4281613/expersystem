var models = require('../connectdata');//数据库链接信息
var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var $db = require('../dbfun');//sql语句

// 连接数据库
mongoose.connect(models.mongodb.url);

var conn = mongoose.connection;
conn.once('error',function () {
  console.log('connect error');
});
conn.once('open',function () {
  console.log('connect successd');
});

// 增加用户接口
router.post('/findUser', (req, res) => {
    var params = req.body;
    console.log("db",db);
    console.log("params",params);
    let newAccount=new $db.user.login({
      username:params.username,
      userpass:params.userpass
    });
    newAccount.save(function (err,data) {
      if(err){
        res.send(err);
      }else{
        res.send('success');
        mongoose.disconnect();
      }
    })
  }
);

module.exports = router;
