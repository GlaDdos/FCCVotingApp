'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;

function optionValidator(val){
    return val ? true : false;
}

const custom = [optionValidator, "option must have a name."];

const Poll = new Schema({
   owner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
   title: {type: String, required: true},
   options: [{ name: {type: String, validate: custom, required: true},votes: { type: Number, default: 0} }] ,
   date: { type: Date, default: Date.now }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

Poll.pre('findOneAndUpdate', function(next){
    this.options.runValidators = true;
    next();
});

Poll.virtual('votes').get(function(){
   return this.options.reduce( function( prev, current){
        return prev + current.votes;
    }, 0);
});

Poll.statics.addOption = function(id, optionName, callback) {

    return this.findOneAndUpdate({
        _id: id
    },
    {
        $push: {'options': { name: optionName, votes: 1 }}
    },
    {
        new: true
    }, callback);
};

Poll.set('toObject', {virtuals: true});

exports.Poll = mongoose.model("Poll", Poll);