import express from "express";
const seekerRouter = express.Router();

seekerRouter.route("/").get(() => {}); // get all seekers
seekerRouter
  .route("/:seeker_id")
  .get(() => {})
  .put(() => {}); // get a seeker info / update a seeker's info

export default seekerRouter;
