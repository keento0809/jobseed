import express, { Request, Response, NextFunction } from "express";
import {
  loginSeeker,
  signupSeeker,
  logoutSeeker,
} from "../controllers/authController";
const authRouter = express.Router();

authRouter.route("/signup").post(signupSeeker); // register a new seeker
authRouter.route("/login").post(loginSeeker); // login a seeker
authRouter.route("/logout").post(logoutSeeker); // logout a seeker
// authRouter.route("/test").get(authorization, testHandler); // test authorization

export default authRouter;
