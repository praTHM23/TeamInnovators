const Post = require('../models/post.model')
const cloudinary= require('../helpers/cloudinaryUpload')

// create
exports.addPost = async (req, res) => {
    try {
        console.log(req.body)
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
    
        // Create new post
          const post = new Post({
          UserID: req.body.UserID,
          photo_link: result.secure_url,
          caption: req.body.caption
        });
        
        await post.save();
        res.status(200).send(post);
      } catch (err) {
        res.send(err);
      }


}
// delete
exports.deletePost = async (req, res) => {
    console.log("deleted post")
     try {
         const post = await Post.findOneAndDelete(req.params.id);
         res.status(200).send(post);
     }
     catch (err){
         res.send(err);
     }}

//get     
exports.getPost = async (req, res) => {
    console.log(req.params.id)
     try {
         const post = await Post.findById(req.params.id);
         res.status(200).send(post);
     }
     catch (err){
         res.send(err);
     }}

//get all
exports.getPosts = async (req, res) => {
    console.log("get all service")
     try {
         const post = await Post.find();
         res.status(200).send(post);
     }
     catch (err){
         res.send(err);
     }}
//update
exports.updatePost = async (req, res) => {
    console.log("update post")
     try {
         const post = await Post.findByIdAndUpdate(req.params.id, req.body,);
         res.status(200).send("updated");
        }
        catch (err){
            res.send(err);
        }}
   