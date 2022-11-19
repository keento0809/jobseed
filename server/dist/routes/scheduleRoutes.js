"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const scheduleController_1 = require("../controllers/scheduleController");
const scheduleRouter = express_1.default.Router();
scheduleRouter
    .route("/interested")
    .get(authController_1.authorization, scheduleController_1.getSchedulesSortedByCategory); // get a seeker's schedules sorted by interested
scheduleRouter
    .route("/applied")
    .get(authController_1.authorization, scheduleController_1.getSchedulesSortedByCategory); // get a seeker's schedules sorted by applied
scheduleRouter
    .route("/interview")
    .get(authController_1.authorization, scheduleController_1.getSchedulesSortedByCategory); // get a seeker's schedules sorted by interview
scheduleRouter
    .route("/rejected")
    .get(authController_1.authorization, scheduleController_1.getSchedulesSortedByCategory); // get a seeker's schedules sorted by rejected
scheduleRouter.route("/new").post(authController_1.authorization, scheduleController_1.createSchedule); // add a new schedule
// scheduleRouter.route("/other").get(() => {}); // get a seeker's schedules sorted by other
scheduleRouter
    .route("/:seeker_id")
    .get(authController_1.authorization, scheduleController_1.getSchedules)
    .put(authController_1.authorization, scheduleController_1.updateSchedule)
    .delete(authController_1.authorization, scheduleController_1.deleteSchedule);
scheduleRouter
    .route("/:seeker_id/calendar")
    .get(authController_1.authorization, scheduleController_1.getSchedulesByDate);
scheduleRouter
    .route("/:schedule_id")
    .get(authController_1.authorization, scheduleController_1.getOneSchedule)
    .put(authController_1.authorization, scheduleController_1.updateSchedule)
    .delete(authController_1.authorization, scheduleController_1.deleteSchedule);
exports.default = scheduleRouter;
