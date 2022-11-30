import express from "express";
import {
  getCompaniesWithStatus,
  createNewCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/companyController";
import { authorization } from "../controllers/authController";
const companyRouter = express.Router();

companyRouter
  .route("/:seeker_id/:status")
  .get(authorization, getCompaniesWithStatus);

companyRouter
    .route("/new")
    .post(authorization, createNewCompany);

companyRouter
  .route("/:company_id")
  .patch(authorization, updateCompany)
  .delete(authorization, deleteCompany);

export default companyRouter;
