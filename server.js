import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

import express from 'express';
import bodyParser from 'body-parser';

import { resolve } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import config from './webpack.config';
import routes from './app/routes/index';

dotenv.load();

//webpack dev server for bundling and live reloading react
const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
  contentBase: 'src',
  inline: true,
  hot: true,
  historyApiFallback: true,
  proxy: {
    "/api": "http://localhost:3000"
  },
  stats: "errors-only",
  publicPath: '/'
});

server.listen(3001, 'localhost', (err, result) => {
  console.log('wtf');
});


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

routes(app);

mongoose.connect('mongodb://localhost:27017/votingapp');

app.listen(3000, function (err) {
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
