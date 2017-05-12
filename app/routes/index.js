'use strict';

import { addPoll, getPolls, getUserPolls, votePoll, deletePoll } from '../controllers/pollController';
import { login, register } from '../controllers/authentication';
import express from 'express';
import passport from 'passport';
import '../config/passport';

const path = process.cwd();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

export default function (app) {
  app.route('/api/polls')
    .get((req, res) => {
      getPolls(req, res);
    })
    .post((req, res) => {
      addPoll(req, res);
    });

  app.route('/api/polls/:id')
    .get(getUserPolls)
    .post((req, res) => {
      res.json({confirmation: 'succes', resource: 'edit pool confirmation login'});
    })
    .delete(deletePoll);

  app.route('/api/polls/:id/:voteId')
    .get((req, res) => {
      res.json({id: req.params.id, voteId: req.params.voteId});
    })
    .post((req, res) => {
      votePoll(req, res);
    });

  app.route('/auth/require')
    .get(requireAuth, (req, res) => {
        res.json({response: 'You are authenticated'})
    });
    
  app.route('/auth/register')
    .post(register);

  app.route('/auth/login')
    .post(requireLogin, login);
}
