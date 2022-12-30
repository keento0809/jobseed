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
exports.testHandler = exports.authorization = exports.logoutSeeker = exports.signupSeeker = exports.loginSeeker = void 0;
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
    const loginSeeker = yield postgres_1.default.query(`SELECT * FROM seeker WHERE email = $1`, [email]);
    if (!loginSeeker)
        next(new Error("Seeker not found."));
    const hashedPassword = loginSeeker.rows[0].password;
    const checkPassword = yield bcrypt_1.default.compare(password, hashedPassword);
    if (!checkPassword)
        next(new Error("Password is not correct."));
    // create token
    const token = yield createToken(loginSeeker.rows[0].seeker_id);
    // retrieve seeker info form db
    const loginSeekerName = loginSeeker.rows[0].name;
    const loginSeekerEmail = loginSeeker.rows[0].email;
    const loginSeekerPassword = loginSeeker.rows[0].password;
    const loginSeekerInfo = yield postgres_1.default.query("SELECT * FROM seeker WHERE seeker.name = $1 AND seeker.email = $2 AND seeker.password = $3", [loginSeekerName, loginSeekerEmail, loginSeekerPassword]);
    if (!loginSeekerInfo)
        next(new Error("No seeker found"));
    const seeker = loginSeekerInfo.rows[0];
    res
        .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    })
        .status(200)
        .json({ msg: "good login", token, seeker });
    next();
}));
exports.signupSeeker = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, passwordConfirmation, } = req.body;
    if (!name || !email || !password || !passwordConfirmation)
        next(new Error("Invalid inputs"));
    if (password !== passwordConfirmation)
        next(new Error("password are not correct"));
    // hash password
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const newSeekerData = yield postgres_1.default.query(`INSERT INTO seeker (name,email,password) VALUES($1,$2,$3) RETURNING *`, [name, email, hashedPassword]);
    if (!newSeekerData)
        next(new Error("Failed to register new seeker"));
    // create token
    const token = createToken(newSeekerData.rows[0].seeker_id);
    const seeker = newSeekerData.rows[0];
    res.status(200).json({ msg: "good signup", token, seeker });
    next();
}));
exports.logoutSeeker = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.access_token;
    if (!token)
        return res.sendStatus(403);
    res.clearCookie("access_token").status(200).json({ msg: "good logout" });
    next();
}));
exports.authorization = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.headers.authorization ||
        !((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer")))
        next(new Error("You're not authorized."));
    const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1];
    if (!token)
        next(new Error("No token found."));
    try {
        const jwtData = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        if (!jwtData)
            next(new Error("Invalid token"));
        return next();
    }
    catch (err) {
        console.log(err);
        return next(new Error("Invalid token"));
    }
}));
exports.testHandler = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.access_token;
    res.json({ msg: "test is successfully done." });
    next();
}));
