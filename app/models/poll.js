'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Poll = new Schema(
  { owner: String },
  { title: String },
  { options: [{ name: String, votes: { type: Number, default: 0 } }] },
  { date: { type: Date, default: Date.now } }
);

export default mongoose.model("Poll", Poll);
