import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import AWS from "aws-sdk";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

export const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  accessKeyId: accessKey!,
  secretAccessKey: secretAccessKey!,
});

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretAccessKey!,
  },
  region: bucketRegion!,
});

export function uploadDocument(fileName: string) {
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: bucketName!,
    Key: fileName!,
    Body: fileContent!,
  };
  s3.upload(params, function (err: any, data: any) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
}

export function uploadFile(fileBuffer: any, fileName: any, mimetype: any) {
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: mimetype,
  };
  return s3Client.send(new PutObjectCommand(uploadParams));
}

export function deleteFile(fileName: any) {
  const deleteParams = {
    Bucket: bucketName,
    Key: fileName,
  };
  return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key: any) {
  const params = {
    Bucket: bucketName,
    Key: key,
  };
  const command = new GetObjectCommand(params);
  const seconds = 60;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
  return url;
}
