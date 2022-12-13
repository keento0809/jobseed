"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const authController_1 = require("../controllers/authController");
const seekerController_1 = require("../controllers/seekerController");
const seekerRouter = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
seekerRouter
    .route("/:seeker_id")
    .get(authController_1.authorization, seekerController_1.getSeekerInfo)
    .patch(authController_1.authorization, seekerController_1.updateSeekerInfo);
seekerRouter
    .route("/avatar/:seeker_id")
    .get(authController_1.authorization, seekerController_1.getAvatar)
    .post(authController_1.authorization, upload.single("image"), seekerController_1.addAvatar)
    .patch(authController_1.authorization, seekerController_1.updateAvatar);
seekerRouter
    .route("/location/:seeker_id")
    .patch(authController_1.authorization, seekerController_1.updateSeekerLocation);
exports.default = seekerRouter;
