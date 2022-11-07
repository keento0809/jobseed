import express from "express";
import { loginSeeker, signupSeeker } from "../controllers/authController";
const authRouter = express.Router();

authRouter.route("/signup").post(signupSeeker); // register a new seeker
authRouter.route("/login").post(loginSeeker); // login a seeker
authRouter.route("/logout").post(); // logout a seeker

export default authRouter;
