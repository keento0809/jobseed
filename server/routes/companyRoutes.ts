import express from "express";
const companyRouter = express.Router();

companyRouter.route("/").get(() => {});

export default companyRouter;
