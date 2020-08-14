var models = require('../connectdata');//数据库链接信息
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var $db = require('../dbfun');//sql语句

//登录注册
const loginMsg = require('./loginMsg');
const resMsg = require('./resMsg');
//教师
const stuploadMsg = require('./teachInterface/stuploadMsg');
const experfileMsg = require('./teachInterface/experfileMsg');
const experfiledelMsg = require('./teachInterface/experfiledelMsg');
const experfileminMsg = require('./teachInterface/experfileminMsg');
const experfileupminMsg = require('./teachInterface/experfileupminMsg');
const experfiledelminMsg = require('./teachInterface/experfiledelminMsg');
const teachUploadExper = require('./teachInterface/teachUploadExper');
const teachUploadtemporary = require('./teachInterface/teachUploadtemporary');
const teachaddcourseMsg = require('./teachInterface/teachaddcourseMsg');
const teachaddclassMsg = require('./teachInterface/teachaddclassMsg');
const teachdelclassMsg = require('./teachInterface/teachdelclassMsg');
const teachdeletecourseMsg = require('./teachInterface/teachdeletecourseMsg');
const teachcourseMsg = require('./teachInterface/teachcourseMsg');
const teachcourseminMsg = require('./teachInterface/teachcourseminMsg');
const teachupcourseMsg = require('./teachInterface/teachupcourseMsg');
const stuexpermanageMsg = require('./teachInterface/stuexpermanageMsg');
//学生
const personChange = require('./studentByLjj/personChange');
const personMsg = require('./studentByLjj/personMsg');
const stuUplMsg = require('./studentByLjj/stuUplMsg');
const stuDolMsg = require('./studentByLjj/stuDolMsg');
const stuAttMsg = require('./studentByLjj/stuAttMsg');
const stuUplFile = require('./studentByLjj/stuUplFile');
const stuDolFile = require('./studentByLjj/stuDolFile');
const delUplFile = require('./studentByLjj/delUplFile');
const stuSelCourse = require('./studentByLjj/stuSelCourse');
const stuClassifySea = require('./studentByLjj/stuClassifySea');
const stuDolSea = require('./studentByLjj/stuDolSea');
const stuExpSea = require('./studentByLjj/stuExpSea');
const courseMsg = require('./studentByLjj/courseMsg');
const courseSea = require('./studentByLjj/courseSea');
const createTable = require('./studentByLjj/createTable');
const homeAll = require('./studentByLjj/homeAll');
const homeDynamic = require('./studentByLjj/homeDynamic');
const sendComment = require('./studentByLjj/sendComment');
const allCourseMsg = require('./studentByLjj/allCourseMsg');
const allUplMsg = require('./studentByLjj/allUplMsg');
const dolTable = require('./studentByLjj/dolTable');

// 连接数据库
mongoose.connect(models.mongodb.url);

var conn = mongoose.connection;
conn.once('error', function () {
  console.log('connect error');
});
conn.once('open', function () {
  console.log('connect successd');
});

//登录注册
router.post('/loginMsg', loginMsg); //登录信息
router.post('/resMsg', resMsg); //注册信息

//教师
router.post('/stuploadMsg', stuploadMsg); //学生上传动态
router.post('/experfileMsg', experfileMsg); //下载实验指导书信息
router.post('/experfiledelMsg', experfiledelMsg); //删除实验指导书信息
router.post('/experfileminMsg', experfileminMsg); //实验指导书详细信息
router.post('/experfileupminMsg', experfileupminMsg); //实验指导书更新详细信息
router.post('/experfiledelminMsg', experfiledelminMsg); //实验指导书删除详细信息
router.post('/teachUploadExper', teachUploadExper); //上传指导书信息到七牛云
router.post('/teachUploadtemporary', teachUploadtemporary); //上传指导书信息到临时文件夹
router.post('/teachaddcourseMsg', teachaddcourseMsg);    //增加课程
router.post('/teachdeletecourseMsg', teachdeletecourseMsg);    //删除课程
router.post('/teachdelclassMsg', teachdelclassMsg);    //删除课程
router.post('/teachupcourseMsg', teachupcourseMsg);    //更新课程
router.post('/teachcourseMsg', teachcourseMsg);    //老师选课程列表
router.post('/teachcourseminMsg', teachcourseminMsg);    //老师选课程详情列表
router.post('/teachaddclassMsg', teachaddclassMsg);    //增加班级
router.post('/stuexpermanageMsg', stuexpermanageMsg); //学生实验管理
//学生
router.post('/personChange', personChange);  //修改个人信息接口
router.post('/personMsg', personMsg);   //查询个人信息接口
router.post('/stuUplMsg', stuUplMsg);   //学生上传的文件数据
router.post('/stuDolMsg', stuDolMsg);   //学生可以下载的文件
router.post('/stuAttMsg', stuAttMsg);   //学生关注的课程
router.post('/courseMsg', courseMsg);  //可选课程列表
router.post('/stuUplFile', stuUplFile);   //学生上传接口
router.get('/stuDolFile', stuDolFile);   //学生下载接口
router.post('/delUplFile', delUplFile);  //学生删除上传的文件接口
router.post('/stuSelCourse', stuSelCourse);   //学生关注课程接口
router.post('/stuClassifySea', stuClassifySea);    //学生课程分类搜索接口
router.post('/stuExpSea', stuExpSea);   //学生实验搜索接口
router.post('/stuDolSea', stuDolSea);   //学生下载文件接口
router.post('/courseSea', courseSea);   //学生选课搜索接口
router.post('/createTable', createTable);   //生成汇报表
router.post('/homeAll', homeAll);  //home的所有信息
router.get('/homeDynamic', homeDynamic);  //home动态信息
router.post('/sendComment', sendComment);   //发送动态信息
router.post('/allCourseMsg', allCourseMsg);  //当前学生全部的课程信息
router.post('/allUplMsg', allUplMsg);  //当前学生全部的上传信息
router.get('/dolTable', dolTable);  //下载汇报表

module.exports = router;
