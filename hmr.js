var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var os = require('os');

new WebpackDevServer(webpack(config), {
    contentBase: 'public/',
    publicPath: '/',
    hot: true,
    noInfo: true
}).listen(3000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at http://' + os.hostname() + ':3000')
});