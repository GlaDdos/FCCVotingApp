'use strict';

require('dotenv').config();

export default {

  'githubAuth': {
    'cliendID': process.env.GITHUB_CLIENTID,
    'clientSecret': process.env.GITHUB_CLIENTSECRET,
    'callbackURL': process.env.GITHUB_CALLBACKURL
  },

  'facebookAuth': {
    'clientID': process.env.FACEBOOK_CLIENTID,
    'clientSecret': process.env.FACEBOOK_CLIENTSECRET,
    'callbackURL':process.env.FACEBOOK_CALLBACKURL
  },

  'googleAuth': {
    'clientID': process.env.GOOGLE_CLIENTID,
    'clientSecret': process.env.GOOGLE_CLIENTSECRET,
    'callbackURL': process.env.GOOGLE_CALLBACKURL
  }
};
