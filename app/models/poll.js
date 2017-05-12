'use strict';

import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;

const Poll = new Schema({
   owner: {type: Schema.Types.ObjectId, ref: 'User'},
   title: String ,
   options: [{ name: String, votes: { type: Number, default: 0 } }] ,
   date: { type: Date, default: Date.now }
}
);

export default mongoose.model("Poll", Poll);
