"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controllers/companyController");
const authController_1 = require("../controllers/authController");
const companyRouter = express_1.default.Router();
companyRouter.route("/:seeker_id").get(authController_1.authorization, companyController_1.getAllCompanies);
companyRouter
    .route("/:seeker_id/:status")
    .get(authController_1.authorization, companyController_1.getCompaniesWithStatus);
companyRouter.route("/new").post(authController_1.authorization, companyController_1.createNewCompany);
companyRouter
    .route("/:seeker_id/:company_id")
    .patch(authController_1.authorization, companyController_1.updateCompany)
    .delete(authController_1.authorization, companyController_1.deleteCompany);
exports.default = companyRouter;
