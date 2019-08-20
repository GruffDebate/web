import AWS from "aws-sdk/global";
import S3 from "aws-sdk/clients/s3";

export const IMAGE_URL = `${process.env.GATSBY_ASSETS_BUCKET}`;
export const S3_NAME = `${process.env.GATSBY_ASSETS_BUCKET_NAME}`;

export async function Upload(folder, file) {
  const creds = {
    bucket: `${S3_NAME}/${folder}`,
    access_key: process.env.GATSBY_ACCESS_KEY,
    secret_key: process.env.GATSBY_SECRET_KEY
  };

  if (file === null) {
    return null;
  }

  const extension = file.type.split("/")[1];
  const name = file.name.split(".")[0];
  const fileName = `${name}-${new Date().getTime()}.${extension}`;

  AWS.config.update({
    accessKeyId: creds.access_key,
    secretAccessKey: creds.secret_key
  });
  AWS.config.region = "us-east-2";

  const bucket = new S3({ params: { Bucket: creds.bucket, Key: fileName } });
  const params = {
    Key: fileName,
    ContentType: file.type,
    Body: file,
    ServerSideEncryption: "AES256"
  };

  await bucket.putObject(params).promise();
  return fileName;
}
