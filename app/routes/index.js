'use strict';

const pollController = require('../controllers/pollController');
const auth = require('../controllers/authentication');
const express = require('express');
const passport = require('passport');

require( '../config/passport');

const path = process.cwd();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

exports.routes = function (app) {
  app.route('/api/polls')
    .get((req, res, next) => {
      console.log('fuck this shit');
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

}
