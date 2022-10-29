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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewCompany = exports.getAllCompanies = void 0;
const middlewares_1 = require("../helpers/middlewares");
exports.getAllCompanies = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    if (!seeker_id)
        next(new Error("Invalid params"));
    res.status(200).json({ msg: "succeeded to get companies" });
    next();
}));
exports.createNewCompany = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, link, jobType, company_size, salary, location, description, status, interest, } = req.body;
    if (!name ||
        !link ||
        !jobType ||
        !company_size ||
        !salary ||
        !description ||
        !status ||
        !interest)
        next(new Error("Invalid values"));
    next();
}));
