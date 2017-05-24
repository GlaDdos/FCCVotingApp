'use strict';

import { addPoll, getPolls, getPoll, getUserPolls, votePoll, deletePoll } from '../controllers/pollController';
import { login, register } from '../controllers/authentication';
import express from 'express';
import passport from 'passport';
import '../config/passport';

const path = process.cwd();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

export default function (app) {
  app.route('/api/polls')
    .get(getPolls);

  app.route('/api/polls/:userId')
    .get(getUserPolls);

  app.route('/api/poll')
    .post(requireAuth, addPoll);

  app.route('/api/poll/:pollId')
    .get(getPoll)
   // .post(requireAuth, addOption)
    .delete(requireAuth, deletePoll)

  app.route('/api/poll/:pollId/:optionId')
    .post(votePoll);

  app.route('/auth/require')
    .get(requireAuth, (req, res) => {
        res.json({response: req.user})
    });
    
  app.route('/auth/register')
    .post(register);

  app.route('/auth/login')
    .post(requireLogin, login);
}
