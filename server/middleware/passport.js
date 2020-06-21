/* eslint-disable no-shadow */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
// eslint-disable-next-line prefer-destructuring
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const config = require("../contollers/config");
const User = require("../models/user");
// 1) setup options for jwt strategy, asi passport sabe de donde sacar la info para procesar el token
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};
// 2) create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // payload es el jwt token desde jwt.encode (sub,iat,secret), quiero ver si el userId en el payload existe en la db, si->done, no->done sin user object. Payload y done son de passport
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      // done(null, false);
      return done(null, false, {
        message: "bad username or passwords don't match",
      });
    }
  });
});

// 3) tell passport to use this strategy
passport.use(jwtLogin);

// create local strategy
const localLogin = new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    // verify email pass
    User.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      // si el user exite
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }
);
passport.use(localLogin);
