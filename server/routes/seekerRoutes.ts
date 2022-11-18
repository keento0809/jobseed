import express from "express";
import { authorization } from "../controllers/authController";
import {
  getSeekerInfo,
  updateSeekerInfo,
  addAvatar,
} from "../controllers/seekerController";
const seekerRouter = express.Router();

seekerRouter
  .route("/:seeker_id")
  .get(authorization, getSeekerInfo)
  .put(authorization, updateSeekerInfo);
seekerRouter.route("/:seeker_id/avatar").put(authorization, addAvatar);

export default seekerRouter;
