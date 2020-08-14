
const $db = require('../../dbfun');//sql语句
const qiniu=require('qiniu');

//缺删除数据库和本地缓存文件

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("开始上传");
  let params = JSON.parse(req.body);//有时会获取不到
  console.log("params",params);
  let myModel = $db.experuploadfile; //学生信息实例
  //params.sfname为文件名字
  myModel.find({new_name:params.sfname},{},(err, result) => {
    let mes;
    mes=result;
    const uploadname=mes[0].old_name;//上传到七牛云的临时文件名字
    const frontname=mes[0].new_name;
    console.log(mes.length);
    //console.log(uploadname);
    console.log("查询结束");
    //res.send({data:mes});

    //----------------下面开始上传----------------------
    if(mes.length==1) {
      const bucket = 'expersystem';  //七牛云存储空间名字
      const qiniuUrl = 'http://p9hnx9ad0.bkt.clouddn.com';//七牛云的域名
      let token, putPolicy;  //设置token扫描器,putPolicy上传策略
      let filepath;  //文件上传后的路径
      let key = uploadname;  //上到七牛云后文件的名字
      //七牛云个人密钥
      let AK = 'Voa-weDtnRpPIqbyO37ucaNLTGsU_7tA8dladuV-';
      let SK = 'moQVxM1EQU-ruWSzeI8R_KcGOxsj9O7Ev0v95qbs';
      //定义鉴定对象mac
      var mac = new qiniu.auth.digest.Mac(AK, SK);

      filepath = qiniuUrl + '/' + key;//文件上传后的地址赋值
      console.log("文件上传后的地址", filepath);

      //上传凭证
      var option = {
        scope: bucket,
        expire: 7200, //上传凭证有效时间
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","fname":$(fname),"mimeType":$(mimeType),"ext":$(ext)}', //回调内容，具体看七牛云官方文档
      }
      putPolicy = new qiniu.rs.PutPolicy(option);
      token = putPolicy.uploadToken(mac);
      console.log(token);
      //构建配置对象
      var config = new qiniu.conf.Config();
      config.zone = qiniu.zone.Zone_z2;//华南服务器
      //文件上传
      var localFile = './teaUploadFile/' + uploadname;//本地缓存的文件路径
      var formUploader = new qiniu.form_up.FormUploader(config);
      var putExtra = new qiniu.form_up.PutExtra();

      formUploader.putFile(token, key, localFile, putExtra, function (respErr, respBody, respInfo) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode == 200) {
          console.log(respBody);
          let myModel2 = $db.experfile; //实验信息实例
          let addfile=new myModel2({
            file_name: params.sfname,
            file_type: params.sftype,
            file_time: params.sftime,
            file_teacher: params.sfteach,
            file_require: params.sfrequire,
            file_path: filepath
          });
          addfile.save(function(err,data){
            if(err){console.log(err);}
            else{
              console.log("Res:" + data);console.log("实验存储成功");}
          });
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });
      let data={
        mes:"success",
        fileadress:filepath,
        filename:params.sfname,
        filetype:params.sftype,
        filetime:params.sftime,
        fileteach:params.sfteach,
        filerequire:params.sfrequire,
      }
      res.send(data);
    }else{
      res.send("fault");
    }
  });
}
