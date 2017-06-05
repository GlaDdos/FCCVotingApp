'use strict';

import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;

const Poll = new Schema({
   owner: {type: Schema.Types.ObjectId, ref: 'User'},
   title: String ,
   options: [{ name: String, votes: { type: Number, default: 0 } }] ,
   date: { type: Date, default: Date.now }
},
{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
}
);

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

export default mongoose.model("Poll", Poll);
