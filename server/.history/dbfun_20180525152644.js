const mongoose = require('mongoose');
var loginSchema = mongoose.Schema({
  username: String,
  userpass: String
});
let uploadSchema = mongoose.Schema({
  file_classify: String,
  file_name: String,
  file_size: String,
  file_create: String,
  file_sendtime: String
});
let downloadSchema = mongoose.Schema({
  stu_name: String,
  file_classify: String,
  file_name: String,
  file_size: String,
  file_create: String,
  file_sendtime: String
});
var UserMD = {
  user: {
    login: mongoose.model('login', loginSchema),
  },
  upload: mongoose.model('upload_msg', uploadSchema),
  download: mongoose.model('download_msg', downloadSchema);
}

module.exports = UserMD;
