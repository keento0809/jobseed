"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controllers/companyController");
const authController_1 = require("../controllers/authController");
const companyRouter = express_1.default.Router();
companyRouter.route("/:seeker_id").get(authController_1.authorization, companyController_1.getAllCompanies); // get all interesting companies
companyRouter.route("/new").post(() => { }); // add a new interesting company
exports.default = companyRouter;
