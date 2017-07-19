'use strict';

const pollController =  require('../controllers/pollController');
const auth = require('../controllers/authentication');
const express = require('express');
const passport = require('passport');

require('dotenv').config();
require ('../config/passport');

const path = process.cwd();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: true });
const reqFacebookAuth = passport.authenticate('facebook', {session: true, scope: 'email'})

exports.routes =  function (app) {
  app.route('/api/polls')
    .get((req, res, next) => {
      pollController.getPolls()
        .then( json => {
          res.json(json);
        })
        .catch(next)
    });

  app.route('/api/polls/:userId')
    .get((req, res, next) => {
      pollController.getUserPolls(req.params.userId)
        .then( json => {
          res.json(json);
        })
        .catch(next)
    });

  app.route('/api/poll')
    .post(requireAuth, (req, res, next) => {
      pollController.addPoll(req.user._id, req.body.title, req.body.options)
        .then( json => {
          res.json(json);
        })
        .catch(next);
    });

  app.route('/api/poll/:pollId')
    .get((req, res, next) => {
      pollController.getPoll(req.params.pollId)
        .then(json => {
          res.json(json);
        })
        .catch(next)
    })

    .post(requireAuth, (req, res, next) => {
      pollController.addOption(req.params.pollId, req.body.option)
        .then(json => {
          res.json(json);
        })
        .catch(next);
    })

    .delete(requireAuth, (req, res, next) => {
      pollController.deletePoll(req.user._id, req.params.pollId)
        .then( () => {
          res.status('201').json({message: 'Poll successfully deleted!'});
        })
        .catch(next)
    })

  app.route('/api/poll/:pollId/:optionId')
    .post((req, res, next) => {
      pollController.votePoll(req.params.pollId, req.params.optionId)
        .then( json => {
          res.json(json);
        })
        .catch(next)
    });

  app.route('/auth/require')
    .get(requireAuth, (req, res) => {
        res.json({response: req.user})
    });
    
  app.route('/auth/register')
    .post(auth.register);

  app.route('/auth/login')
    .post(requireLogin, auth.login);

  app.route('/auth/logout')
    .get((req, res, next) => {
      req.logOut();
      req.session.destroy();
      res.status('200').json({message: 'Log out.'});
    })

  app.route('/auth/facebook')
    .get(passport.authenticate('facebook', { sesstion: true, scope : 'email' }));

  app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
      failureRedirect: process.env.APP_URL + '/login',
      successRedirect: process.env.APP_URL + '/login/social'
    }));

  app.route('/auth/google')
    .get(passport.authenticate('google', {session: true,  scope: ['profile', 'email']}));

  app.route('/auth/google/callback')
    .get(passport.authenticate('google', {
      failureRedirect: process.env.APP_URL + '/login/',
      successRedirect: process.env.APP_URL + '/login/social'
    }));

  app.route('/auth/github')
    .get(passport.authenticate('github', {session: true, scope: ['profile']}));

  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      failureRedirect: process.env.APP_URL + '/login',
      successRedirect: process.env.APP_URL + '/login/social'
    }));

  app.route('/auth/social/login')
    .get(auth.loginOAuth, auth.login);

}
