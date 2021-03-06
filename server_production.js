const express = rquire('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const resolve = require( 'path').resolve;
const mongoose = require('mongoose');

const routes = require( './app/routes/index');
const errorHandler = require('./app/utils/errorHandler');

dotenv.load();

const app = express();

const options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/votingapp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
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
