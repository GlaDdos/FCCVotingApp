import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import User from '../models/user';

function setUserInfo(user) {
  return {
    _id: user.id,
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    email: user.email
  };
}

function generateToken(user) {
  return jwt.sign(user, 'super secret', { expiresIn: 10080 });
}

const register = (req, res, next) => {
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

    let user = new User({
      email: email,
      password: password,
      profile: { firstName: firstName, lastName: lastName }
    });

    user.save((err, user) => {
      if(err) return next(err);

      let userInfo = setUserInfo(user);
      res.status(201).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
      });
    });
  });
}

const login = (req, res, next) => {
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT' + generateToken(userInfo),
    user: userInfo
  });
}

export {
  register,
  login
}
