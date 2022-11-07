import express from "express";
import { getAllCompanies } from "../controllers/companyController";
const companyRouter = express.Router();

companyRouter.route("/:seeker_id").get(getAllCompanies); // get all interesting companies
companyRouter.route("/new").post(() => {}); // add a new interesting company

export default companyRouter;
