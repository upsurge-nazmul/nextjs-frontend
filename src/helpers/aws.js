import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET,
} from "../../config";

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({
  params: { Bucket: AWS_BUCKET },
  region: "ap-south-1",
});
export async function uploadaudiotos3(userId, file) {
  const err = false;
  const params = {
    Body: file,
    Bucket: AWS_BUCKET,
    Key: "audio/" + userId + "/" + uuidv4() + ".ogg",
  };
  const url = "https://" + AWS_BUCKET + ".s3.amazonaws.com/" + params.Key;
  s3.putObject(params).send((err, data) => {
    if (err) {
      err = true;
    }
  });
  if (err) return null;
  return url;
}
