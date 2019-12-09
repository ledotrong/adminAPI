const passport = require('passport');
const passwordJWT = require('passport-jwt');
const ExtractJWT = passwordJWT.ExtractJwt;
const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passwordJWT.Strategy;

require('dotenv').config();

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, cb) => {
      try {
        const user = await Admin.findOne({ email });
        console.log(user.role);

        if (!user) {
          return cb(null, false, { message: 'Incorrect email or password.' });
        }

        validatePass = await bcrypt.compare(password, user.password);
        if (!validatePass)
          return cb(null, false, {
            message: 'Incorrect email or password.'
          });
        else if (user.role !== 'admin' && user.role !== 'master') {
          return cb(null, false, {
            message: 'Permittion denied'
          });
        } else
          return cb(null, user, {
            message: 'Logged In Successfully'
          });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET
    },
    async (jwtPayload, cb) => {
      try {
        const user = await Admin.findById(jwtPayload.userID);

        if (!user) {
          return cb(null, false);
        } else if (
          jwtPayload.role === 'admin' ||
          jwtPayload.role === 'master'
        ) {
          return cb(null, user);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
