module.exports = (res, err) => {
    if (err) {
        console.error(err);
        res.end('数据库错误');
    }
}