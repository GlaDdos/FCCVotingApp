import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { resolve } from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';

import routes from './app/routes/index';
import errorHandler from './app/utils/errorHandler';

require('dotenv').config();



const app = express();

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

routes(app);

app.use(errorHandler);

app.listen(3000, function (err) {
  if(err){
    console.log('Express error..');
    console.log(err);
  }
  else {
    console.log('API server is listening...');
  }
});
