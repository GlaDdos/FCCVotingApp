import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import express from 'express';
import config from './webpack.config';
import { resolve } from 'path';


const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
  contentBase: 'src',
  inline: true,
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/api": "http://localhost:8081"
  },
  stats: "errors-only",
  publicPath: '/'
});

server.listen(3000, 'localhost', (err, result) => {
  console.log('wtf')
});

const app = express();

app.listen(8081, function (err) {
  if(err){
    console.log('Express error..');
    console.log(err);
  }
  else {
    console.log('API server is listening...');
  }
});

app.get('/api', function(req, res){
  res.json({request: 'ok'});
});
