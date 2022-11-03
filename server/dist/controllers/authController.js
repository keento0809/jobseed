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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
};
exports.loginSeeker = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        next(new Error("Invalid inputs"));
    const loggingSeeker = yield postgres_1.default.query(`SELECT * FROM seeker WHERE email = $1`, [email]);
    if (!loggingSeeker)
        next(new Error("Seeker not found."));
    const hashedPassword = loggingSeeker.rows[0].password;
    const checkPassword = yield bcrypt_1.default.compare(password, hashedPassword);
    if (!checkPassword)
        next(new Error("Password is not correct."));
    // create token
    const token = yield createToken(loggingSeeker.rows[0].seeker_id);
    res.json({ msg: "good login", token });
    next();
}));
exports.signupSeeker = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, passwordConfirmation } = req.body;
    if (!name || !email || !password || !passwordConfirmation)
        next(new Error("Invalid inputs"));
    if (password !== passwordConfirmation)
        next(new Error("password are not correct"));
    // hash password
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const newSeeker = yield postgres_1.default.query(`INSERT INTO seeker (name,email,password) VALUES($1,$2,$3) RETURNING *`, [name, email, hashedPassword]);
    // create token
    const token = yield createToken(newSeeker.rows[0].seeker_id);
    res.json({ newSeeker: newSeeker.rows[0], token });
    next();
}));
