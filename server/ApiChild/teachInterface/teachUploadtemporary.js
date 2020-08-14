const fs = require('fs');
const formidable=require('formidable');
const path=require('path');
var sd = require("silly-datetime");
const $db = require('../../dbfun');//sql语句

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //res.setHeader("Access-Control-Allow-Methods", "POST");
  console.log("临时缓存中",req);
  //检测文件夹是否存在
  let form=new formidable.IncomingForm();
  //解析内容
  form.parse(req,function(err,field,files){//错误，传来的数据，文件
    if(err){
      return res.json({
        "code": 500,
        "message": "内部服务器错误"
      })
    }
    let options={
      fname:field.filename,
      ftype:field.filetype,
      fsize:field.filesize
    }
    console.log(files);
    console.log("params",options);

    var ran = parseInt(Math.random() * 8999 +10000);
    var t = sd.format(new Date(),'YYYYMMDDHHmmss');
    var extname = path.extname(files.upfile.name);
    var oldpath=files.upfile.path;
    var newpath='./teaUploadFile/'+t+ran+extname;
    var readStream=fs.createReadStream(oldpath);
    var writeStream=fs.createWriteStream(newpath);
    readStream.pipe(writeStream);
    return readStream.on('open',function(){
      fs.unlinkSync(oldpath);
      console.log("shift temporary file success");
      let myModel = $db.experuploadfile; //缓存文件实例
      /*myModel.find({},{},(err, result) => {
        let mes;
        mes=result;
        console.log(mes);
      });*/
      let temfile=new myModel({
        old_name:t+ran+extname,
        old_path:newpath,
        file_type:options.ftype,
        file_size:options.fsize,
        file_time:t,
        new_name:options.fname,
        new_path:'',
        limit_time:'20180829'
      });
      temfile.save(function(err,data){
        if(err){console.log(err);}
        else{console.log("Res:" + data);console.log("缓存结束");
          res.end("success");}
      });
    })
    //res.writeHead(200, {'content-type': 'text/plain'});抬头错误
  });
}
