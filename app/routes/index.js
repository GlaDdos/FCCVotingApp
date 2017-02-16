'use strict';

const path = process.cwd();

export default function (app) {
  app.route('/api/pools')
    .get((req, res) => {
      res.json({confirmation: 'success', resource: 'get pools' });
    })
    .post((req, res) => {
      res.json({confirmation: 'succes', resource: 'post pools'});
    });

  app.route('/api/pools/:id')
    .get((req, res) => {
      res.json({confirmation: 'success', resource: 'get resource with id'});
    })
    .post((req, res) => {
      res.json({confirmation: 'succes', resource: 'edit pool confirmation login'});
    })
    .delete((req, res) => {
      res.json({confirmation: 'succes', resource: 'delete pool confirmation login'});
    });

  app.route('/api/pools/:id/:voteId')
    .post((req, res) => {
      res.json({confirmation: 'success', resource: 'post vote'});
    });
}
