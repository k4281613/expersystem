const mongoose = require('mongoose');
var loginSchema = mongoose.Schema({
  username: String,
  userpass: String
});
let uploadSchema = mongoose.Schema({
  file_classify: String,
  file_name: String,
  file_size: String
});
let downloadSchema = mongoose.Schema({

});
var UserMD = {
  user: {
    login: mongoose.model('login', loginSchema),
  },
  upload: mongoose.model('upload_msg', uploadSchema)
}

module.exports = UserMD;
