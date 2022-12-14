import express from "express";
import { authorization } from "../controllers/authController";
import {
  getSchedules,
  getSchedulesByDate,
  getOneSchedule,
  getSchedulesSortedByCategory,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController";
const scheduleRouter = express.Router();

scheduleRouter
  .route("/interested")
  .get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by interested
scheduleRouter
  .route("/applied")
  .get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by applied
scheduleRouter
  .route("/interview")
  .get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by interview
scheduleRouter
  .route("/rejected")
  .get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by rejected
scheduleRouter.route("/new").post(authorization, createSchedule); // add a new schedule
// scheduleRouter.route("/other").get(() => {}); // get a seeker's schedules sorted by other
scheduleRouter
  .route("/allSchedules/:seeker_id")
  .get(authorization, getSchedules);
scheduleRouter
  .route("/allSchedules/:seeker_id/:schedule_id")
  .patch(authorization, updateSchedule)
  .delete(authorization, deleteSchedule);

scheduleRouter
  .route("/:seeker_id/calendar")
  .get(authorization, getSchedulesByDate);

scheduleRouter
  .route("/:schedule_id")
  .get(authorization, getOneSchedule)
  .put(authorization, updateSchedule)
  .delete(authorization, deleteSchedule);

export default scheduleRouter;
