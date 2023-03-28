const User = require("../models/user.model");
const cloudinary = require("../helpers/cloudinaryUpload");


// delete
exports.deleteUser = async (req, res) => {
  console.log("deleted user");
  try {
    const user = await User.findOneAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    res.send(err);
  }
};
//get all
exports.getUsers = async (req, res) => {
    console.log("get all users");
    try {
      const user = await User.find();
      res.status(200).send(user);
    } catch (err) {
      res.send(err);
    }
  };
//get
exports.getUser = async (req, res) => {
    console.log(req.params.id)
     try {
         const post = await User.findById(req.params.id);
         res.status(200).send(post);
     }
     catch (err){
         res.send(err);
     }}
//update

exports.updateUser=async(req,res)=>{
  try{
    console.log(req.params.id)
  

    if (Object.keys(req.body).length === 0 && !req.file) {
      return res.status(404).json({ message: 'Request body and file both are empty' });
    }

      let userDocs={

      }
      console.log(req.file)
      if(req.file!=undefined)
      {
        const profilePic= await cloudinary.uploader.upload(req.file.path,{
          resource_type: "auto"
      })
      userDocs["profile_pic"]=profilePic.secure_url

      }
      console.log(userDocs)
    
     
      const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        ...req.body,
        ...userDocs
      })
    if(!updatedUser)
    {
      return res.status(404).json({ message: 'User not found' });
    }
    else
    {
        const data=await User.findById(req.params.id)
        return res.status(200).json({ Updaeteduser: data });
    }
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}


// exports.updateUser = async (req, res) => {
//   try {
  
//     if(req.file== undefined){
//         const updateUser= {
//             first_name:req.body.first_name,
//             last_name:req.body.last_name,
//             mobile:req.body.mobile,
//             shortBio:req.body.shortBio,
//             longBio:req.body.longBio,
//             gender:req.body.gender,
//             city:req.body.city,
//             state:req.body.state,
//             dob:req.body.dob,
//             chat_users:req.body.chat_users
//     }
//     const user = await User.findByIdAndUpdate(req.params.id,  updateUser);
//     }
//     else{
//         const userRecord= await User.findById(req.params.id);
//         // check if the user profile is there in mongodb if yes delete it
//       if(userRecord.profile_pic !=""){
//           console.log("image deleted")
        
//           cloudinary.uploader.destroy(req.body.email, (error, result) => {
//               if (error) {
//                 console.error(error);
//               } else {
//                 console.log(result);
//               }
  
//             });
          
//       }
//         // Upload image to cloudinary
//         const result = await cloudinary.uploader.upload(req.file.path,  { public_id: req.body.email });
//       const updateUser= {
//           first_name:req.body.first_name,
//           last_name:req.body.last_name,
//           mobile:req.body.mobile,
//           profile_pic:result.secure_url,
//           shortBio:req.body.shortBio,
//           longBio:req.body.longBio,
//           gender:req.body.gender,
//           city:req.body.city,
//           state:req.body.state,
//           dob:req.body.dob,
//           chat_users:req.body.chat_users
//   }
//       const user = await User.findByIdAndUpdate(req.params.id,  updateUser);
//     }
    
//     const updatedRecord= await User.findById(req.params.id);
//     console.log("updated")
//     res.status(200).send(updatedRecord);
//   } catch (err) {
//     res.send(err);
//   }
// };
