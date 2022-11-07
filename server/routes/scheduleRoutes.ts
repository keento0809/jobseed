import express from "express";
const scheduleRouter = express.Router();

scheduleRouter.route("/:seeker_id").get(() => {}); // get a seeker's all schedules
scheduleRouter.route("/interested").get(() => {}); // get a seeker's schedules sorted by interested
scheduleRouter.route("/applied").get(() => {}); // get a seeker's schedules sorted by applied
scheduleRouter.route("/in-progress").get(() => {}); // get a seeker's schedules sorted by in progress
scheduleRouter.route("/past").get(() => {}); // get a seeker's schedules sorted by past
scheduleRouter.route("/other").get(() => {}); // get a seeker's schedules sorted by other
scheduleRouter.route("/new").post(() => {}); // add a new schedule

export default scheduleRouter;
