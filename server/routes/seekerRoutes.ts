import express from "express";
const seekerRouter = express.Router();

seekerRouter.route("/").get(() => {}); // get all seekers
seekerRouter
  .route("/:seeker_id")
  .get(() => {})
  .put(() => {}); // get a seeker / update a seeker's info
seekerRouter.route("/new").post(() => {}); // create a new seeker?

export default seekerRouter;
