import express from "express";
import { authorization } from "../controllers/authController";
import {
  getSeekerInfo,
  updateSeekerInfo,
  addAvatar,
  getAvatar,
  updateAvatar,
} from "../controllers/seekerController";
const seekerRouter = express.Router();

seekerRouter
  .route("/:seeker_id")
  .get(authorization, getSeekerInfo)
  .patch(authorization, updateSeekerInfo);
seekerRouter
  .route("/avatar/:seeker_id")
  .get(authorization, getAvatar)
  .post(authorization, addAvatar)
  .put(authorization, updateAvatar);

export default seekerRouter;
