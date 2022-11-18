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
exports.addAvatar = exports.updateSeekerInfo = exports.getSeekerInfo = void 0;
const middlewares_1 = require("../helpers/middlewares");
const postgres_1 = __importDefault(require("../db/postgres"));
exports.getSeekerInfo = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    if (!seeker_id)
        next(new Error("Invalid request"));
    const seekerInfo = yield postgres_1.default.query("SELECT * FROM seeker WHERE seeker.seeker_id = $1", [seeker_id]);
    if (!seekerInfo)
        next(new Error("No seeker found"));
    const seeker = seekerInfo.rows[0];
    res.status(200).json({ msg: "Good seeker", seeker });
    next();
}));
exports.updateSeekerInfo = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    if (!seeker_id)
        next(new Error("Invalid request"));
    const { name, email } = req.body;
    if (!name || !email)
        next(new Error("Invalid inputs"));
    const updatingSeeker = yield postgres_1.default.query("UPDATE seeker SET name = $1, email = $2 WHERE seeker.seeker_id = $3 RETURNING *", [name, email, seeker_id]);
    if (!updatingSeeker)
        next(new Error("Failed to update seeker"));
    res.status(200).json({ msg: "Good seeker update", updatingSeeker });
    next();
}));
exports.addAvatar = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { avatar } = req.body;
    if (!avatar)
        next(new Error("No avatar attached"));
    // Need to add functions sending avatar to S3
    res.status(200).json({ msg: "Good avatar" });
    next();
}));
