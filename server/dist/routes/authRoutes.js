"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authRouter = express_1.default.Router();
authRouter.route("/signup").post(authController_1.signupSeeker); // register a new seeker
authRouter.route("/login").post(authController_1.loginSeeker); // login a seeker
authRouter.route("/logout").post(authController_1.logoutSeeker); // logout a seeker
// authRouter.route("/test").get(authorization, testHandler); // test authorization
exports.default = authRouter;
