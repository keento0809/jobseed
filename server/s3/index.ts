import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

export const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretAccessKey!,
  },
  region: bucketRegion!,
});

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
  // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
  const command = new GetObjectCommand(params);
  const seconds = 60;
  const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });

  return url;
}
