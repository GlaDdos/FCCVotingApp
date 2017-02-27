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

          // object of all the users
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
  res.send({id: req.params.id, voteId: req.params.voteId});
  //TODO: voting part of the api, then fetch req for vote reducer

  // convert to mongoose -> db.polls.update({_id: ObjectId("58b319844aaf5b2daa9aa12c"), 'options._id': ObjectId("58b319844aaf5b2daa9aa12f") }, {$inc: {'options.$.votes': 1}})
}
