import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: "",
  api_key: ,
  api_secret: "",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    console.log("uploading done");

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //removes the file from the server as the file upload got failed
    console.log(`Some error in upload on cloudinary function : ${error}`);
    return null;
  }
};

export { uploadOnCloudinary };
