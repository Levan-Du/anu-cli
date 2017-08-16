var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
//通过localhost可以访问项目文件夹下的所有文件，等于动态为每个静态文件创建了路由
app.use(express.static(path.join(__dirname, '/dist')))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/dist'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3002, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3002');
});