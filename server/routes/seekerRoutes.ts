import express from "express";
import multer from "multer";
import { authorization } from "../controllers/authController";
import {
  getSeekerInfo,
  updateSeekerInfo,
  addAvatar,
  getAvatar,
  updateAvatar,
  updateSeekerLocation,
} from "../controllers/seekerController";
const seekerRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

seekerRouter
  .route("/:seeker_id")
  .get(authorization, getSeekerInfo)
  .patch(authorization, updateSeekerInfo);
seekerRouter
  .route("/avatar/:seeker_id")
  .get(authorization, getAvatar)
  .post(authorization, upload.single("image"), addAvatar)
  .patch(authorization, updateAvatar);
seekerRouter
  .route("/location/:seeker_id")
  .patch(authorization, updateSeekerLocation);

export default seekerRouter;
