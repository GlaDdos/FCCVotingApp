const express     = require('express');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const resolve     = require('path').resolve;
const mongoose    = require('mongoose');
const passport    = require('passport');
const session     = require('express-session');

const routes       = require('./app/routes/index').routes;
const errorHandler = require('./app/utils/errorHandler').errorHandler;

require('dotenv').config();

if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

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

if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger');
    console.log('API server is listening... passenger');
} else {
    app.listen(3000);
    console.log('API server is listening...');
