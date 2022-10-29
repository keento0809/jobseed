"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seekerRouter = express_1.default.Router();
seekerRouter.route("/").get(() => { }); // get all seekers
seekerRouter
    .route("/:seeker_id")
    .get(() => { })
    .put(() => { }); // get a seeker info / update a seeker's info
exports.default = seekerRouter;
