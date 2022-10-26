import express from "express";
const authRouter = express.Router();

authRouter.route("/signup").post(() => {}); // register a new seeker
authRouter.route("/login/:seeker_id").post(() => {}); // login a seeker
authRouter.route("/logout").post(() => {}); // logout a seeker

export default authRouter;
