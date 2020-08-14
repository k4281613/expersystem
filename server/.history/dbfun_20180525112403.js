const mongoose = require('mongoose');
var loginSchema=mongoose.Schema({
  username:String,
  userpass:String
});
var UserMD={
  user:{
    login:mongoose.model('login',loginSchema),
  }
}
module.exports=UserMD;
