import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { AWS } from "./config.js";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const client = new S3Client({
  region: AWS.BUCKET_REGION,
  credentials: {
    accessKeyId: AWS.PUBLIC_KEY,
    secretAccessKey: AWS.SECRET_KEY,
  },
});

export const uploadFile = async (file) => {
  // : File
  const stream = fs.createReadStream(file.tempFilePath);

  const uploadParams = {
    Bucket: AWS.BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);

  try {
    return await client.send(command);
    // process data.
  } catch (error) {
    const { requestId, cfId, extendedRequestId } = error.$$metadata;
    console.log({ requestId, cfId, extendedRequestId });
    throw new Error("Upload fail");
  }
};

export const getFiles = async () => {
  const command = new ListObjectsCommand({
    Bucket: AWS.BUCKET_NAME,
  });

  return await client.send(command);
};

export const getFile = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: AWS.BUCKET_NAME,
    Key: fileName,
  });

  return await client.send(command);
};

export const downloadFile = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: AWS.BUCKET_NAME,
    Key: fileName,
  });

  const result = await client.send(command);
  result.Body.pipe(fs.createWriteStream(`./images/${fileName}`));
};

export const getFileURL = async (fileName) => {
  const command = new GetObjectCommand({
    Bucket: AWS.BUCKET_NAME,
    Key: fileName,
  });

  return await getSignedUrl(client, command, { expiresIn: 3600 }); // seconds
};
