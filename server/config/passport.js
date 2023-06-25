import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModel } from "../model/userModel.js";

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PRIVATE_KEY || "secret-key";

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      if (payload.userId) {
        const user = payload.userId;
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

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "502951516118-qta7aqug0ervhlepaour32a5bv7nmoqn.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/api/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { name,email } = profile._json;

      let user = await userModel.findOne({ emailAddress: email });
      if (user==null) {
        const newUser = new userModel({
          userName: name,
          emailAddress: email,
          city: "64972aa33d1974b584d27cba",
        });
        const validationError = newUser.validateSync();
  
        if (validationError) {
          throw new Error(validationError.message);
        }
  
        user=await newUser.save();
      }
       done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
