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
    const companiesData = yield postgres_1.default.query("SELECT * FROM company JOIN schedule ON company.company_id = schedule.company_id JOIN seeker ON schedule.seeker_id = seeker.seeker_id WHERE seeker.seeker_id = $1", [seeker_id]);
    if (!companiesData)
        next(new Error("No company found"));
    const companies = companiesData.rows;
    console.log(companies, "a-a-a-");
    res.status(200).json({ msg: "succeeded to get companies", companies });
    next();
}));
exports.getCompaniesWithStatus = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.params;
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
    res.status(200).json({ companiesWithStatus });
    next();
}));
exports.createNewCompany = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, link, jobtype, salary, location, description, interest, seeker_id, } = req.body;
    if (!name || !jobtype)
        next(new Error("Invalid input values"));
    const newCompany = yield postgres_1.default.query("INSERT INTO company (name,link,jobtype,salary,location,description,status,interest,seeker_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *", [
        name,
        link,
        jobtype,
        salary,
        location,
        description,
        "Interested",
        interest,
        seeker_id,
    ]);
    if (!newCompany)
        next(new Error("Failed to create company"));
    res.status(200).json({ newCompany });
    next();
}));
exports.updateCompany = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_id } = req.params;
    if (!company_id)
        next(new Error("Invalid request"));
    const { name, link, jobtype, location, description, salary, status, interest, seeker_id, } = req.body;
    const updatingCompany = yield postgres_1.default.query("UPDATE company SET name = $1,link = $2,jobtype = $3,salary = $4,location = $5,description = $6,interest = $7,status = $8,seeker_id = $9 WHERE company.company_id = $10 RETURNING *", [
        name,
        link,
        jobtype,
        salary,
        location,
        description,
        interest,
        status,
        seeker_id,
        company_id,
    ]);
    if (!updatingCompany)
        next(new Error("Failed to update company"));
    res.status(200).json({ updatingCompany });
    next();
}));
exports.deleteCompany = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_id } = req.params;
    if (!company_id)
        next(new Error("Invalid request"));
    const deletingCompany = yield postgres_1.default.query("SELECT * FROM company WHERE company.company_id = $1", [company_id]);
    if (!deletingCompany)
        next(new Error("Company not found"));
    yield postgres_1.default.query("DELETE FROM company WHERE company.company_id = $1", [
        company_id,
    ]);
    res.status(200).json({ msg: "company deleted", deletingCompany });
    next();
}));
