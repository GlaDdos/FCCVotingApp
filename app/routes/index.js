'use strict';

import { addPoll, getPolls, votePoll } from '../controllers/pollController';
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
    .get((req, res) => {
      res.json({confirmation: 'success', resource: 'get resource with id'});
    })
    .post((req, res) => {
      res.json({confirmation: 'succes', resource: 'edit pool confirmation login'});
    })
    .delete((req, res) => {
      res.json({confirmation: 'succes', resource: 'delete pool confirmation login'});
    });

  app.route('/api/polls/:id/:voteId')
    .get((req, res) => {
      res.json({id: req.params.id, voteId: req.params.voteId});
    })
    .post((req, res) => {
      votePoll(req, res);
    });

  app.route('/auth/register')
    .post(register);

  app.route('/auth/login')
    .post(requireLogin, login);
}
