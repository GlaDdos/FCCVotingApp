const crypto =  require('crypto');
const jwt    = require('jsonwebtoken');

const User = require('../models/user').User;

function setUserInfo(user) {
  return {
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

function generateToken(user) {
  return jwt.sign(user, 'super secret', { expiresIn: 10080 });
}

exports.register = (req, res, next) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if(!email) {
    return res.status(422).send({ error: 'You must enter an email adress.' });
  }

  if(!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter first and last name.' });
  }

  if(!password){
    return res.status(422).send({ error: 'You must enter password.'})
  }

  User.findOne({ email: email }, (err, existingUser) => {
    if(err) return next(err);

    if(existingUser){
      return res.status(422).json({ error: 'This email adress is already in use.'});
    }

    const newUser = new User();
    
      newUser.email = email;
      newUser.password = newUser.hashPassword(password);
      newUser.firstName = firstName;
      newUser.lastName= lastName;

    newUser.save((err) => {
      if(err) return next(err);

      let userInfo = setUserInfo(newUser);
      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
}

exports.login = (req, res, next) => {
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}

exports.loginOAuth = (req, res,  next) => {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.status(404).json({ok: 'not authenticated'});

  }
}