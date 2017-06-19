'use strict';

import { addPoll, addOption, getPolls, getPoll, getUserPolls, votePoll, deletePoll } from '../controllers/pollController';
import { login, register } from '../controllers/authentication';
import express from 'express';
import passport from 'passport';
import '../config/passport';

const path = process.cwd();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

export default function (app) {
  app.route('/api/polls')
    .get((req, res, next) => {
      getPolls()
        .then( json => {
          res.json(json);
        })
        .catch(next)
    });

  app.route('/api/polls/:userId')
    .get((req, res, next) => {
      getUserPolls(req.params.userId)
        .then( json => {
          res.json(json);
        })
        .catch(next)
    });

  app.route('/api/poll')
    .post(requireAuth, (req, res, next) => {
      addPoll(req.user._id, req.body.title, req.body.options)
        .then( json => {
          res.json(json);
        })
        .catch(next);
    });

  app.route('/api/poll/:pollId')
    .get((req, res, next) => {
      getPoll(req.params.pollId)
        .then(json => {
          res.json(json);
        })
        .catch(next)
    })

    .post(requireAuth, (req, res, next) => {
      addOption(req.params.pollId, req.body.option)
        .then(json => {
          res.json(json);
        })
        .catch(next);
    })

    .delete(requireAuth, (req, res, next) => {
      deletePoll(req.user._id, req.params.pollId)
        .then( () => {
          res.status('201').json({message: 'Poll successfully deleted!'});
        })
        .catch(next)
    })

  app.route('/api/poll/:pollId/:optionId')
    .post((req, res, next) => {
      votePoll(req.params.pollId, req.params.optionId)
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
    .post(register);

  app.route('/auth/login')
    .post(requireLogin, login);

}
