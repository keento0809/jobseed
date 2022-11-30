"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.createNewCompany = exports.getCompaniesWithStatus = exports.getAllCompanies = void 0;
const middlewares_1 = require("../helpers/middlewares");
const postgres_1 = __importDefault(require("../db/postgres"));
exports.getAllCompanies = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    if (!seeker_id)
        next(new Error("Invalid seeker"));
    const companies = yield postgres_1.default.query("SELECT * FROM company JOIN schedule ON company.company_id = schedule.company_id JOIN seeker ON schedule.seeker_id = seeker.seeker_id WHERE seeker.seeker_id = $1", [seeker_id]);
    if (!companies)
        next(new Error("No company found"));
    res.status(200).json({ msg: "succeeded to get companies", companies });
    next();
}));
exports.getCompaniesWithStatus = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
    console.log(status);
    if (!status ||
        (status !== "Interested" &&
            status !== "Applied" &&
            status !== "Interview" &&
            status !== "Rejected"))
        return next(new Error("Invalid request"));
    const companiesWithStatusInfo = yield postgres_1.default.query("SELECT * FROM company WHERE company.status = $1", [status]);
    if (!companiesWithStatusInfo)
        next(new Error("No companies found"));
    const companiesWithStatus = companiesWithStatusInfo.rows;
    res
        .status(200)
        .json({ msg: "good companies with status", companiesWithStatus });
    next();
}));
exports.createNewCompany = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, link, jobtype, company_size, salary, location, description, interest } = req.body;
    if (!name || !jobtype)
        next(new Error("Invalid input values"));
    const newCompany = yield postgres_1.default.query("INSERT INTO company (name,link,jobtype,company_size,salary,location,description,status,interest) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *", [
        name,
        link,
        jobtype,
        company_size,
        salary,
        location,
        description,
        "Interested",
        interest
    ]);
    if (!newCompany)
        next(new Error("Failed to create company"));
    res.status(200).json({ msg: "Company successfully created", newCompany });
    next();
}));
exports.updateCompany = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_id } = req.params;
    if (!company_id)
        next(new Error("Invalid request"));
    const { companyObj } = req.body;
    const { name, link, location, jobType, description, status, interest } = companyObj;
    const updatingCompany = yield postgres_1.default.query("UPDATE company SET name = $1,link = $2,location = $3,jobType = $4,description = $5,status = $6,interest = $7  WHERE company.company_id = $8", [name, link, location, jobType, description, status, interest, company_id]);
    if (!updatingCompany)
        next(new Error("No company found"));
    res.status(200).json({ msg: "Company updated" });
    next();
}));
exports.deleteCompany = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_id } = req.params;
    if (!company_id)
        next(new Error("Invalid request"));
    const deletingCompany = yield postgres_1.default.query("SELECT * FROM company WHERE company.company_id = $1", [company_id]);
    if (!deletingCompany)
        next(new Error("Company not found"));
    res.status(200).json({ msg: "company deleted", deletingCompany });
    next();
}));
