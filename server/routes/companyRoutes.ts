import express from "express";
import {
  getCompaniesWithStatus,
  createNewCompany,
  updateCompany,
  deleteCompany,
  getAllCompanies,
} from "../controllers/companyController";
import { authorization } from "../controllers/authController";
const companyRouter = express.Router();

companyRouter.route("/:seeker_id").get(authorization, getAllCompanies);

companyRouter
  .route("/:seeker_id/:status")
  .get(authorization, getCompaniesWithStatus);

companyRouter.route("/new").post(authorization, createNewCompany);

companyRouter
  .route("/:seeker_id/:company_id")
  .patch(authorization, updateCompany)
  .delete(authorization, deleteCompany);

export default companyRouter;
