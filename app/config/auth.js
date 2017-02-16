'use strict';

export default {
  'githubAuth': {
    'cliendID': process.env.GITHUB_KEY,
    'clientSecret': process.env.GITHUB_SECRET,
    'callbackURL': process.env.APP_URL + 'auth/github/callback'
  }
};
