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
exports.deleteSchedule = exports.updateSchedule = exports.createSchedule = exports.getSchedulesSortedByCategory = exports.getSchedules = void 0;
const postgres_1 = __importDefault(require("../db/postgres"));
const middlewares_1 = require("../helpers/middlewares");
exports.getSchedules = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    if (!seeker_id)
        next(new Error("Invalid request"));
    const schedulesData = yield postgres_1.default.query("SELECT * FROM schedule WHERE schedule.seeker_id = $1", [seeker_id]);
    if (!schedulesData)
        next(new Error("No schedule found"));
    const schedules = schedulesData.rows;
    res.status(200).json({ msg: "good schedule", schedules });
    next();
}));
exports.getSchedulesSortedByCategory = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    if (!params)
        next(new Error("Invalid request"));
    res.status(200).json({ msg: "good category" });
    next();
}));
exports.createSchedule = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}));
exports.updateSchedule = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}));
exports.deleteSchedule = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    next();
}));
