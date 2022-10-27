import express from "express";
const authRouter = express.Router();

authRouter.route("/signup").post(() => {}); // register a new seeker
authRouter.route("/login").post(() => {}); // login a seeker
authRouter.route("/login/google").post(() => {}); // login with google account
authRouter.route("/logout").post(() => {}); // logout a seeker

export default authRouter;
