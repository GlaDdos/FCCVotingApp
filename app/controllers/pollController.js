'use strict';

import Poll from '../models/poll';
import NotFound from './../utils/NotFoundError';

export function addPoll(userId, title, options) {

    const newPoll = Poll({
      owner: userId,
      title: title,
      options: options
    });

    return newPoll.save();
}

export function getPolls() {
  return Poll
      .find({})
      .populate('owner', 'profile');
}

export function getUserPolls(userId) {
  return Poll
      .find({owner: userId})
      .populate('owner', 'profile')
      .catch( (err) => {
        throw  new NotFound('User not found');
      })
}

export function votePoll(pollId, optionId) {
  return Poll
      .findOneAndUpdate(
        {_id: pollId, 'options._id': optionId},
        {$inc: { 'options.$.votes': 1}},
        {new: true})
      .populate('owner', 'profile');
}

export function getPoll(pollId){
  return Poll
      .findOne({
        _id: pollId
      })
      .populate('owner', 'profile')
      .then( poll => {
        if(!poll){
          throw new NotFound("Poll not found!");
        } else {
          return new Promise( (resolve, reject) => {
            resolve(poll);
          });
        }
      })
      .catch( err => {
        throw new NotFound("Poll not found!");
      });
}

export function deletePoll(userId, pollId) {
  return Poll.
      findOne({
        owner: userId, 
        _id: pollId
      })
      .then((poll) => {
        if(poll){
          poll.remove()
        } else {
          throw new NotFound("Poll not found!");
        }
      })
}

export function addOption(pollId, option) {
  return Poll
    .addOption(pollId, option)
    .populate('owner', 'profile');
}