
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PRIVATE_KEY ||"secret-key"


passport.use(
    new JwtStrategy(opts, async (payload, done) => {
      try {
        if (payload.userId) {
          const user  = payload.userId
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log(err);
        return done(err, false);
      }
    })
  );
  
  export default passport;
