"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const seekerController_1 = require("../controllers/seekerController");
const seekerRouter = express_1.default.Router();
seekerRouter.route("/:seeker_id").put(authController_1.authorization, seekerController_1.updateSeekerInfo);
seekerRouter.route("/:seeker_id/avatar").put(authController_1.authorization, seekerController_1.addAvatar);
exports.default = seekerRouter;
