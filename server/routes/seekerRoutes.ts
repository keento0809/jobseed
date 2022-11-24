import express from "express";
import { authorization } from "../controllers/authController";
import {
  getSeekerInfo,
  updateSeekerInfo,
  addAvatar,
  updateAvatar,
} from "../controllers/seekerController";
const seekerRouter = express.Router();

seekerRouter
  .route("/:seeker_id")
  .get(authorization, getSeekerInfo)
  .patch(authorization, updateSeekerInfo);
seekerRouter
  .route("/avatar/:seeker_id")
  .post(authorization, addAvatar)
  .put(authorization, updateAvatar);

export default seekerRouter;
