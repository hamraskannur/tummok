// authMiddleware.js
import passport from 'passport';

const jwtMiddleware = passport.authenticate('jwt', { session: false });

export default jwtMiddleware;
