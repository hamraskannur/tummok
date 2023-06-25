import { Router } from "express";
import authenticateUser from "../middleware/authenticateUser.js";
import {
  registerUser,
  loginUser,
  Auth,
  googleLogin,
} from "../controllers/auth.js";
import passport from "passport";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/google", passport.authenticate("google",{ scope: ['profile', 'email'] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {session:false}),googleLogin
);
router.post("/authenticate", authenticateUser, Auth);

export default router;
