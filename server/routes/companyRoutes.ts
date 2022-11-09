import express from "express";
import {
  getAllCompanies,
  createNewCompany,
  deleteCompany,
} from "../controllers/companyController";
import { authorization } from "../controllers/authController";
const companyRouter = express.Router();

companyRouter.route("/:seeker_id").get(authorization, getAllCompanies); // get all interesting companies
companyRouter.route("/new").post(authorization, createNewCompany); // add a new interesting company
companyRouter.route("/delete").delete(authorization, deleteCompany); // delete a company

export default companyRouter;
