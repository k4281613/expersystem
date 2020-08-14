const mongoose = require('mongoose');
var loginSchema = mongoose.Schema({
  username: String,
  userpass: String
});
var UserMD = {
  user: {
    login: mongoose.model('login', loginSchema),
  }
}
let uploadSchema = mongoose.Schema({
  stu_name: String,
  stu_id: String,
  stu_email: String
});
module.exports = UserMD;
