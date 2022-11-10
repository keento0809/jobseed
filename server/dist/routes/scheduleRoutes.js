"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const scheduleController_1 = require("../controllers/scheduleController");
const scheduleRouter = express_1.default.Router();
scheduleRouter.get("/interested", authController_1.authorization, scheduleController_1.getSchedulesSortedByCategory);
// scheduleRouter
//   .route("/interested")
//   .get(authorization, getSchedulesSortedByCategory); // get a seeker's schedules sorted by interested
scheduleRouter
    .route("/applied")
    .get(authController_1.authorization, scheduleController_1.getSchedulesSortedByCategory); // get a seeker's schedules sorted by applied
scheduleRouter
    .route("/in-progress")
    .get(authController_1.authorization, scheduleController_1.getSchedulesSortedByCategory); // get a seeker's schedules sorted by in progress
scheduleRouter.route("/past").get(authController_1.authorization, scheduleController_1.getSchedulesSortedByCategory); // get a seeker's schedules sorted by past
scheduleRouter.route("/other").get(() => { }); // get a seeker's schedules sorted by other
scheduleRouter
    .route("/:seeker_id")
    .get(authController_1.authorization, scheduleController_1.getSchedules)
    .put(authController_1.authorization, scheduleController_1.updateSchedule)
    .delete(authController_1.authorization, scheduleController_1.deleteSchedule);
scheduleRouter.route("/new").post(() => { }); // add a new schedule
exports.default = scheduleRouter;
