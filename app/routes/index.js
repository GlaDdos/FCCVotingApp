'use strict';

import {addPoll, getPolls} from '../controllers/pollController';

const path = process.cwd();


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
      res.json({id: req.params.id, voteId: req.params.voteId})
    })
    .post((req, res) => {
      res.json({confirmation: 'success', resource: 'post vote'});
    });
}
