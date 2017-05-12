'use strict';

import Poll from '../models/poll';

export function addPoll(req, res, next) {

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

export function getPolls(req, res, next) {
  Poll
    .find({})
    .populate('owner', 'profile')
    .exec(function(err, polls){
      if(err){
        throw err;
      } else {
        res.json(polls);
      }
    });
}

export function getUserPolls(req, res, next) {
  Poll
    .find({owner: req.params.id})
    .populate('owner', 'profile')
    .exec( function(err, polls) {
      if(err){
        throw err;
      } else {
        res.json(polls);
      }
    });
}

export function votePoll(req, res, next) {
  Poll.update(
    {_id: req.params.id, 'options._id': req.params.voteId},
    {$inc: { 'options.$.votes': 1}},
    (err, poll) => {
      if(err) { throw err; }
      res.json(poll);
    }
  );
}

export function deletePoll(req, res, next) {
  Poll.
    findOne({
      owner: req.body.ownerId, 
      _id: req.body.pollId //TODO: owner id maybe from token?
    })
    .remove()
    .exec(err => {
      if(err) {
        throw err;
      } else {
        res.json({status: "ok"})
      }

    })
}