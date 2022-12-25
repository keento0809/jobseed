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
exports.updateSeekerLocation = exports.deleteAvatar = exports.updateAvatar = exports.getAvatar = exports.addAvatar = exports.updateSeekerInfo = exports.getSeekerInfo = void 0;
const middlewares_1 = require("../helpers/middlewares");
const postgres_1 = __importDefault(require("../db/postgres"));
const sharp_1 = __importDefault(require("sharp"));
const s3_1 = require("../s3");
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
    const updatingSeekerData = yield postgres_1.default.query("UPDATE seeker SET name = $1, email = $2 WHERE seeker.seeker_id = $3 RETURNING *", [name, email, seeker_id]);
    if (!updatingSeekerData)
        next(new Error("Failed to update seeker"));
    const updatingSeeker = updatingSeekerData.rows[0];
    res.status(200).json({ msg: "Good seeker update", updatingSeeker });
    next();
}));
exports.addAvatar = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    const file = req.file;
    const fileCaption = file === null || file === void 0 ? void 0 : file.originalname.split(".")[0];
    console.log("fileha, ", file);
    if (!file)
        next(new Error("No avatar attached"));
    // fileBuffer
    const fileBuffer = yield (0, sharp_1.default)(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();
    // add image to s3
    const result = yield (0, s3_1.uploadFile)(fileBuffer, fileCaption, file.mimetype);
    if (!result)
        next(new Error("Failed to upload file to s3"));
    // add data to DB
    const updatingSeekerData = yield postgres_1.default.query("UPDATE seeker SET avatar = $1 WHERE seeker.seeker_id = $2 RETURNING *", [fileCaption, seeker_id]);
    const updatingSeeker = updatingSeekerData.rows[0];
    res.status(200).json({ msg: "Good new avatar", updatingSeeker });
    next();
}));
exports.getAvatar = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    const seekerData = yield postgres_1.default.query("SELECT * FROM seeker WHERE seeker.seeker_id = $1", [seeker_id]);
    if (!seekerData)
        next(new Error("No seeker found"));
    const avatarCaption = seekerData.rows[0].avatar;
    const avatarUrl = yield (0, s3_1.getObjectSignedUrl)(avatarCaption);
    if (!avatarUrl)
        next(new Error("No avatar found"));
    res.status(200).json({ msg: "good avatar", avatarUrl });
    next();
}));
exports.updateAvatar = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    const file = req.file;
    const fileCaption = file === null || file === void 0 ? void 0 : file.originalname.split(".")[0];
    if (!file)
        next(new Error("No avatar attached"));
    // delete current avatar
    yield (0, exports.deleteAvatar)(seeker_id);
    // fileBuffer
    const fileBuffer = yield (0, sharp_1.default)(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();
    // add image to s3
    const result = yield (0, s3_1.uploadFile)(fileBuffer, fileCaption, file.mimetype);
    if (!result)
        next(new Error("Failed to upload file to s3"));
    // add data to DB
    const updatingSeekerData = yield postgres_1.default.query("UPDATE seeker SET avatar = $1 WHERE seeker.seeker_id = $2 RETURNING *", [fileCaption, seeker_id]);
    const updatingSeeker = updatingSeekerData.rows[0];
    res.status(200).json({ msg: "good updating avatar", updatingSeeker });
    next();
}));
const deleteAvatar = (seeker_id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletingAvatarData = yield postgres_1.default.query("SELECT avatar FROM seeker WHERE seeker.seeker_id = $1", [seeker_id]);
    if (!deletingAvatarData.rows[0])
        return;
    const deletingAvatar = deletingAvatarData.rows[0];
    // delete avatar in S3 bucket
    const resultForDeleting = yield (0, s3_1.deleteFile)(deletingAvatar);
    if (!resultForDeleting)
        throw new Error("Failed to delete avatar");
    return resultForDeleting;
});
exports.deleteAvatar = deleteAvatar;
exports.updateSeekerLocation = (0, middlewares_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { seeker_id } = req.params;
    const { location } = req.body;
    const currSeekerData = yield postgres_1.default.query("SELECT * FROM seeker WHERE seeker.seeker_id = $1", [seeker_id]);
    if (!currSeekerData)
        next(new Error("No seeker found"));
    const currSeeker = currSeekerData.rows[0];
    const result = yield postgres_1.default.query("UPDATE seeker SET seeker.location = $1 WHERE seeker.seeker_id = $2", [location, currSeeker.seeker_id]);
    if (!result)
        next(new Error("Failed to update seeker location"));
    res.status(200).json({ msg: "good seeker location", result, location });
    next();
}));
