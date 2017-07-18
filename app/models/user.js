import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { 
    type: String, 
    lowercase: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: 'string' }}
    } 
  }, 
  password: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  facebook: {
    id: { type: String },
    token: { type: String }
  },
  google: {
    id: { type: String },
    token: { type: String }
  },
  github: {
    id: { type: String },
    token: { type: String }
  }
},
  { timestamps: true }
);

UserSchema.methods.hashPassword = function(password) {
  const SALT_FACTOR = 5;

  return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR), null);

};

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) return cb(err);

    cb(null, isMatch);
  });
}

export default mongoose.model('User', UserSchema);
