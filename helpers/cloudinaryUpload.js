const cloudinary=require("cloudinary").v2;

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
 
// exports.uploadImage(file)
// {
//     // const file= req.files.photo;
//     cloudinary.uploader.upload(file.tempFilePath,(err, result)=>{
//         console.log (result);
//        return result; 
//     })
// }
module.exports=cloudinary
