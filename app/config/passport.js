'use strict';

import GitHubStrategy from 'passport-github';
import User from '../models/users';
import configAuth from './auth';

export default function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use( new GitHubStrategy.Strategy({
    clientID: configAuth.githubAuth.cliendId,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL
  }, function( token, refreshToken, profile, done){
    process.nextTick(function(){
      User.findOne({ 'github.id': profile.id}, function (err, user) {
        if(err){
          return done(err);
        }

        if(user){
          return done(null, user);
        } else {
          let newUser = new User();

          newUser.github.id = profile.id;
          newUser.github.username = profile.username;
          newUser.github.displayName = profile.displayName;

          newUser.save( function(err) {
            if(err){
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));


}
