import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import GithubStrategy from 'passport-github';
import { OAuth2Strategy as GoogleStrategy} from 'passport-google-oauth';

import auth from '../config/auth';
import User from '../models/user';

const localOptions = { usernameField: 'email'};

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    done(err, user);
  });
});


const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ 'email': email }, (err, user) => {

    if(err) return done(err);
    if(!user) { return done(null, false, { error: 'Your login details could not be verified. Wrong login or password.'});}

    user.comparePassword(password, (err, isMatch) => {

      if(err) return done(err);
      if(!isMatch) { return done(null, false, {error: 'Your login details could not be verified. Wrong email or password'});}

      return done(null, user);
    });
  });
});

const facebookLogin = new FacebookStrategy({
    clientID: auth.facebookAuth.clientID,
    clientSecret: auth.facebookAuth.clientSecret,
    callbackURL: auth.facebookAuth.callbackURL,
    profileFields: ['id', 'email', 'name']
  },

  function(token, refreshToken, profile, done) {
    process.nextTick(function() {

      User.findOne({'facebook.id': profile.id }, function(err, user) {
        if(err) {
          return done(err);
        }

        if(user){
            return done(null, user);

          } else {
              const newUser = new User();

              newUser.facebook.id = profile.id;
              newUser.facebook.token = token;

              newUser.firstName = profile.name.givenName;
              newUser.lastName = profile.name.familyName;
              newUser.email = profile.emails[0].value;

              newUser.save((err) => {
                if(err) return done(null, false);

                return done(null, newUser);
            })
          }

       }); 
   });
});


const githubLogin = new GithubStrategy({
  clientID: auth.githubAuth.cliendID,
  clientSecret: auth.githubAuth.clientSecret,
  callbackURL: auth.githubAuth.callbackURL
},
  function(token, refreshToken, profile, done){
    process.nextTick(function(){

        User.findOne({'github.id': profile._json.id}, function(err, user) {
          if(err) return done(err);

          if(user){
              return done(null, user);
            } else {

              const newUser = new User();

              newUser.github.id = profile._json.id;
              newUser.github.token = profile._json.token;
              
              newUser.firstName = profile._json.name.split(" ")[0];
              newUser.lastName = profile._json.name.split(" ")[1];
              newUser.email = profile._json.email;

              newUser.save((err) => {
                if(err) return done(null, false);

                return done(null, newUser);
              });
            }
          }
        )
    })
  });

const googleLogin = new GoogleStrategy({
  clientID: auth.googleAuth.clientID,
  clientSecret: auth.googleAuth.clientSecret,
  callbackURL: auth.googleAuth.callbackURL
},
  function (token, refreshToken, profile, done){
    process.nextTick(function(){

      User.findOne({'google.id': profile.id}, function(err, user) {
        if(err) return done(err);

        if(user){
            console.log('in user');
            return done(null, user)

          } else {
            console.log('in else');
            const newUser = new User();

            newUser.google.id = profile.id;
            newUser.google.token = profile.token;

            newUser.firstName = profile.name.givenName;
            newUser.lastName = profile.name.familyName;
            newUser.email = profile.emails[0].value;

            newUser.save((err) => {
              console.log('in save');
              if(err) return done(null, false);

              console.log('returning new user ffs');
              return done(null, newUser);
            })
          }
        })
    })
  }
)

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
passport.use(facebookLogin);
passport.use(googleLogin);
passport.use(githubLogin);