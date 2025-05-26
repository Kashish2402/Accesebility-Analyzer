import dotenv from 'dotenv'
dotenv.config({path:"./.env"})
import fs from 'fs'
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary=async(localFilePath)=>{
    if(!localFilePath) return next(404,"File not Found")

    try {
        const uploadedFile=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
    
        if(!uploadedFile)return next(400,"Something went wrong... Unable to upload file on cloudinary")

        fs.unlinkSync(localFilePath)
        return uploadedFile
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlink(localFilePath, (unlinkError) => {
        if(unlinkError){
          console.error("Error deleting local file after upload failure", unlinkError);
        } else {
          console.log("Local file deleted due to error");
        }
     });
    }
    return null
    }
}