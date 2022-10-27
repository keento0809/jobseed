import express from "express";
const calendarRouter = express.Router();

calendarRouter.route("/:date").get(() => {}); // get schedule on a day

export default calendarRouter;
