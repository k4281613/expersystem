const userApi = require('./ApiChild/api');
const stuUploadMsg = require('./ApiChild/stuUploadMsg');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 服务开启后访问指定编译好的dist文件下的数据
// app.use(express.static(path.resolve(__dirname, '../dist')))
// app.get('*', function (req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   res.send(html)
// })
// 后端api路由
app.use('/api', userApi);
app.use(stuUploadMsg); //学生上传的文件数据
// 监听端口
app.listen(3000, () => {
    console.log('server listen 3000');
});
