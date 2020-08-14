const mongoose = require('mongoose');
var loginSchema = mongoose.Schema({
  username: String,
  userpass: String
});
let uploadSchema = mongoose.Schema({
  stu_name: String,
  stu_id: String,
  stu_email: String
});
var UserMD = {
  user: {
    login: mongoose.model('login', loginSchema),
  }
}

module.exports = UserMD;
