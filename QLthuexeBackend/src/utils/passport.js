import passport from "passport";
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "482202498083-fs58mcjoc077uq2e3245farh44km8u6p.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
        //them user vào db
      return cb(null, profile);
  }
));

export default passport;