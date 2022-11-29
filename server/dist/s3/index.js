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
exports.getObjectSignedUrl = exports.deleteFile = exports.uploadFile = exports.s3Client = exports.bucketName = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
exports.s3Client = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
});
function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: exports.bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,
    };
    return exports.s3Client.send(new client_s3_1.PutObjectCommand(uploadParams));
}
exports.uploadFile = uploadFile;
function deleteFile(fileName) {
    const deleteParams = {
        Bucket: exports.bucketName,
        Key: fileName,
    };
    return exports.s3Client.send(new client_s3_1.DeleteObjectCommand(deleteParams));
}
exports.deleteFile = deleteFile;
function getObjectSignedUrl(key) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            Bucket: exports.bucketName,
            Key: key,
        };
        const command = new client_s3_1.GetObjectCommand(params);
        const seconds = 60;
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(exports.s3Client, command, { expiresIn: seconds });
        return url;
    });
}
exports.getObjectSignedUrl = getObjectSignedUrl;
