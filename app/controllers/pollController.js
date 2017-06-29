'use strict';

const Poll = require('../models/poll').Poll;
const NotFound = require('./../utils/NotFoundError').NotFound;

module.exports = {

  addPoll: function(userId, title, options) {

      const newPoll = Poll({
        owner: userId,
        title: title,
        options: options
      });

      return newPoll.save();
  },

  getPolls: function () {
    return Poll
        .find({})
        .populate('owner', 'profile');
  },

  getUserPolls: function (userId) {
    return Poll
        .find({owner: userId})
        .populate('owner', 'profile')
        .catch( (err) => {
          throw  new NotFound('User not found');
        })
  },

  votePoll:  function(pollId, optionId) {
    return Poll
        .findOneAndUpdate(
          {_id: pollId, 'options._id': optionId},
          {$inc: { 'options.$.votes': 1}},
          {new: true})
        .populate('owner', 'profile');
  },

  getPoll: function(pollId){
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
  },

  deletePoll: function (userId, pollId) {
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
  },

  addOption: function (pollId, option) {
    return Poll
      .addOption(pollId, option)
      .populate('owner', 'profile');
  }

}