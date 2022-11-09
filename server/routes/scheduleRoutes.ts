import express from "express";
import { authorization } from "../controllers/authController";
import {
  getSchedules,
  getSchedulesSortedByCategory,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController";
const scheduleRouter = express.Router();

scheduleRouter
  .route("/:seeker_id")
  .get(authorization, getSchedules)
  .put(authorization, updateSchedule)
  .delete(authorization, deleteSchedule);
scheduleRouter
  .route("/interested")
  .get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by interested
scheduleRouter
  .route("/applied")
  .get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by applied
scheduleRouter
  .route("/in-progress")
  .get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by in progress
scheduleRouter.route("/past").get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by past
scheduleRouter.route("/other").get(() => {}); // get a seeker's schedules sorted by other
scheduleRouter.route("/new").post(() => {}); // add a new schedule

export default scheduleRouter;
