import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';

import User from '../models/user';

const localOptions = { usernameField: 'email'};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email: email }, (err, user) => {
    if(err) return done(err);
    if(!user) { return done(null, false, { error: 'Your login details could not be verified. Wrong login or password.'});}

    user.comparePassword(password, (err, isMatch) => {
      if(err) return done(err);
      if(!isMatch) { return done(null, false, {error: 'Your login details could not be verified. Wrong email or password'});}

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'super secret'
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if(err) done(err, false);
    if(user){
      done(null, user);
    } else {
      done(null, false)
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
