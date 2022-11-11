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
exports.deleteSchedule = exports.updateSchedule = exports.createSchedule = exports.getSchedulesSortedByCategory = exports.getOneSchedule = exports.getSchedules = void 0;
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
exports.getOneSchedule = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { schedule_id } = req.params;
    if (!schedule_id)
        next(new Error("Invalid request"));
    const scheduleData = yield postgres_1.default.query("SELECT * FROM schedule WHERE schedule.schedule_id = $1", [schedule_id]);
    if (!scheduleData)
        next(new Error("No schedule found"));
    const schedule = scheduleData.rows[0];
    res.status(200).json({ msg: "good schedule", schedule });
    next();
}));
exports.getSchedulesSortedByCategory = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    if (!params)
        next(new Error("Invalid request"));
    const schedulesData = yield postgres_1.default.query("SELECT * FROM schedule JOIN company ON schedule.company_id = company.company_id WHERE company.status = $1", [params]);
    if (!schedulesData)
        next(new Error(`No schedule with ${params} status found`));
    const schedules = schedulesData.rows;
    res.status(200).json({ msg: "good category", schedules });
    next();
}));
exports.createSchedule = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, time, importance, memo, seeker_id, company_id } = req.body;
    if (!title ||
        !date ||
        !time ||
        !importance ||
        !memo ||
        !seeker_id ||
        !company_id)
        next(new Error("Invalid input data"));
    const newScheduleData = yield postgres_1.default.query("INSERT INTO schedule (title,date,importance,memo,seeker_id,company_id,time) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [title, date, importance, memo, seeker_id, company_id, time]);
    if (!newScheduleData)
        next(new Error("Failed to create schedule"));
    const newSchedule = newScheduleData.rows[0];
    res.status(200).json({ msg: "created schedule", newSchedule });
    next();
}));
exports.updateSchedule = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { schedule_id } = req.params;
    const { title, date, importance, memo, seeker_id, company_id, time } = req.body;
    if (!schedule_id)
        next(new Error("Invalid request"));
    const updatingScheduleData = yield postgres_1.default.query("UPDATE schedule SET title = $1,date = $2,importance = $3,memo = $4,seeker_id = $5,company_id = $6,time = $7 WHERE schedule.schedule_id = $8", [title, date, importance, memo, seeker_id, company_id, time, schedule_id]);
    if (!updatingScheduleData)
        next(new Error("Failed to update schedule"));
    const updatingSchedule = updatingScheduleData.rows[0];
    res.status(200).json({ msg: "update schedule", updatingSchedule });
    next();
}));
exports.deleteSchedule = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { schedule_id } = req.params;
    if (!schedule_id)
        next(new Error("Invalid request"));
    const deletingSchedule = yield postgres_1.default.query("DELETE FROM schedule WHERE schedule.schedule_id = $1", [schedule_id]);
    if (!deletingSchedule)
        next(new Error("Failed to create schedule"));
    res.status(200).json({ msg: "delete schedule" });
    next();
}));
