"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.route("/signup").post(() => { }); // register a new seeker
authRouter.route("/login").post(() => { }); // login a seeker
authRouter.route("/login/google").post(() => { }); // login with google account
authRouter.route("/logout").post(() => { }); // logout a seeker
exports.default = authRouter;
