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
exports.signupSeeker = exports.loginSeeker = void 0;
const middlewares_1 = require("../helpers/middlewares");
const bcrypt_1 = __importDefault(require("bcrypt"));
const postgres_1 = __importDefault(require("../db/postgres"));
const saltRound = 10;
exports.loginSeeker = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        next(new Error("Invalid inputs"));
    const seekers = yield postgres_1.default.query(`SELECT * FROM seeker`);
    res.json({ seekers });
    next();
}));
exports.signupSeeker = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, passwordConfirmation } = req.body;
    if (!name || !email || !password || !passwordConfirmation)
        next(new Error("Invalid inputs"));
    if (password !== passwordConfirmation)
        next(new Error("password are not correct"));
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRound);
    const newSeeker = yield postgres_1.default.query(`INSERT INTO seeker (name,email,password) VALUES($1,$2,$3) RETURNING *`, [name, email, hashedPassword]);
    console.log(newSeeker);
    res.json(newSeeker);
    next();
}));
