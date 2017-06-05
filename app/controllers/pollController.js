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

    newPoll.save((err, doc) => {
      if (err) { throw err; }
      else {
        res.json(doc);
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
    .find({owner: req.params.userId})
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
  Poll
    .findOneAndUpdate(
      {_id: req.params.pollId, 'options._id': req.params.optionId},
      {$inc: { 'options.$.votes': 1}},
      {new: true})
    .populate('owner', 'profile')
    .exec( function(err, poll){
      if(err) {
        throw err;
      } else {
        res.json(poll);
      }
    });

}

export function getPoll(req, res, next){
  Poll
    .findOne({
      _id: req.params.pollId
    })
    .populate('owner', 'profile')
    .exec((err, poll) => {
      if(err) {
        throw err;
      } else {
        res.json(poll);
      }
    });
}

export function deletePoll(req, res, next) {
  Poll.
    findOne({
      owner: req.user._id, 
      _id: req.params.pollId
    })
    .remove()
    .exec(err => {
      if(err) {
        throw err;
      } else {
        res.json({status: "ok"}) //todo: it's eturning ok even id there was no item to delete 
      }

    })
}

export function addOption(req, res, next) {
  Poll
    .addOption(req.params.pollId, req.body.option)
    .populate('owner', 'profile')
    .exec( (err, poll) => {
      if(err) {
        throw err;
      } else {
        res.json(poll);
      }
    })
}