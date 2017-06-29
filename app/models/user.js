const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, lowercase: true, unique: true, required: true },
  password: { type: String, required: true },
  profile: {
    firstName: { type: String },
    lastName: { type: String }
  }
},
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  const user = this;
  const SALT_FACTOR = 5;

  if(!this.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        user.password = hash;
        next();
      });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) return cb(err);

    cb(null, isMatch);
  });
}

exports.User = mongoose.model('User', UserSchema);
