'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
  },
  pools: [Schema.Types.ObjectId]
});

export default mongoose.model('User', User);
