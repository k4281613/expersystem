const mongoose = require('mongoose');
const Promise = require("bluebird");
let teachSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  num: String,
  tel: String,
  age: String,
  sex: String,
  introduce: String,
  hobby: String,
  ptype: String
});
let stuSchema = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  num: String,
  tel: String,
  age: String,
  sex: String,
  introduce: String,
  hobby: String,
  ptype: String
});
let stuSchema2 = mongoose.Schema({
  stu_name: String,
  stu_id: String,
  stu_email: String
});
let experfileSchema = mongoose.Schema({
  file_name: String,
  file_type: String,
  file_time: String,
  file_teacher: String,
  file_require: String,
  file_path: String
});
let teachuploadSchema = mongoose.Schema({
  old_name: String,
  old_path: String,
  file_type: String,
  file_size: String,
  file_time: String,
  new_name: String,
  new_path: String,
  limit_time: String
})
let uploadSchema = mongoose.Schema({
  stu_id: String,
  stu_name: String,
  tea_name: String,
  classes: String,
  file_classify: String,
  file_name: String,
  file_url: String,
  file_size: String,
  file_creater: String,
  file_sendtime: String
});

let downloadSchema = mongoose.Schema({
  file_classify: String,
  file_name: String,
  file_url: String,
  file_size: String,
  file_creater: String,
  file_sendtime: String
});

let stuAttention = mongoose.Schema({
  stu_id: String,
  stu_name: String,
  course_name: String,
  tea_name: String,
  classes: String,
  att_time: String
});

let courseMsg = mongoose.Schema({
  teaname: String,
  name: String,
  stunum: String,
  num: String,
  class: String,
  time: String,
  address:String
});

let commentMsg = mongoose.Schema({
  stu_id: String,
  stu_name: String,
  content: String,
  sendtime: String
});

let userMsg = mongoose.Schema({
  name: String,
  username: String,
  password: String,
  num: String,
  tel: String,
  age: String,
  sex: String,
  introduce: String,
  hobby: String,
  email: String,
  ptype: String
});

let homeAll = mongoose.Schema({
  content: String,
  time: String
});

userMsg.methods.findatacount = function (err, result) {
  return result;
}
// stuAttention.methods.findSimilarSizes = function (callback) {
//   return this.model('attention_msg').find({}).limit(5, callback);
// }

let UserMD = {
  user: {
    teachlogin: mongoose.model('teacher', teachSchema),
    stulogin: mongoose.model('student', stuSchema)
  },
  studentMsg: mongoose.model('stu_msg', stuSchema2),
  experfile: mongoose.model('teachexperiment', experfileSchema),
  experuploadfile: mongoose.model('teauploadfile', teachuploadSchema),
  upload: mongoose.model('upload_msg', uploadSchema), //创建学生上传信息模型
  download: mongoose.model('download_msg', downloadSchema),//创建学生下载信息模型
  stuAttention: mongoose.model('attention_msg', stuAttention),
  course: mongoose.model('course', courseMsg), //开设课程模型
  comment: mongoose.model('comment_msg', commentMsg),  //学生吹水模型
  userMsg: mongoose.model('user', userMsg),  //用户表模型
  homeAll: mongoose.model('suoyou_msg', homeAll)  //主页信息模型
}

module.exports = UserMD;
