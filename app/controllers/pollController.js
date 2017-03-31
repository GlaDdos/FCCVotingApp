'use strict';

import Poll from '../models/poll';

export function addPoll(req, res) {

    const body = req.body;
    console.log(req.body.title);

    const newPoll = Poll({
      owner: body.owner,
      title: body.title,
      options: body.options
    });

    newPoll.save((err) => {
      if (err) { throw err; }
      else {
        Poll.find({}, function(err, users) {
          if (err) throw err;


          console.log(users);
});
        res.json({ok: true});
      }
    });
}

export function getPolls(req, res) {
  Poll.find({}, function(err, polls) {
    if(err){
      throw err;
    } else {
      res.json(polls);
    }
  });
}

export function votePoll(req, res) {
  Poll.update(
    {_id: req.params.id, 'options._id': req.params.voteId},
    {$inc: { 'options.$.votes': 1}},
    (err, poll) => {
      if(err) { throw err; }
      res.json(poll);
    }
  );
}
