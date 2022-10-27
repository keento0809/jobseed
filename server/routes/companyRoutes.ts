import express from "express";
const companyRouter = express.Router();

companyRouter.route("/:seeker_id").get(() => {}); // get all interesting companies
companyRouter.route("/new").post(() => {}); // add a new interesting company

export default companyRouter;
