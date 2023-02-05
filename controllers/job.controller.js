const Job = require('../models/job.model')
const cloudinary= require('../helpers/cloudinaryUpload')
// create
exports.addJob = async (req, res) => {

    try {
        // const data={
        //    UserID: req.userId,
        //    ...req.body
        // }
        // const job = await Job.create(data);
        console.log(req.body)
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
    
        // Create new post
          const job = new Job({
          UserID: req.body.UserID,
          title:req.body.title,
          tags:req.body.tags,
          Job_Description:req.body.Job_Description,
          location:req.body.location,
          budget:req.body.budget,
          photo_link: result.secure_url,
          status:req.body.status 
        });
        
        await job.save();
        res.status(200).send(job);
    }
    catch (err){
        res.send(err);
    }

}
// delete
exports.deleteJob = async (req, res) => {
    console.log("deleted job")
     try {
         const job = await Job.findOneAndDelete(req.params.id);
         res.status(200).send(job);
     }
     catch (err){
         res.send(err);
     }}

//get     
exports.getJob = async (req, res) => {
    console.log(req.params.id)
     try {
         const job = await Job.findById(req.params.id).populate('UserID', ['first_name','profile_pic']);
         res.status(200).send(job);
     }
     catch (err){
         res.send(err);
     }}

//get all
exports.getJobs = async (req, res) => {
    console.log("get all jobs")
     try {
         const job = await Job.find().populate('UserID', ['first_name','profile_pic']);
         res.status(200).send(job);
     }
     catch (err){
         res.send(err);
     }}
//update
exports.updateJob = async (req, res) => {
    console.log("update job")
     try {
         const job = await Job.findByIdAndUpdate(req.params.id, req.body,);
         res.status(200).send("updated");
        }
        catch (err){
            res.send(err);
        }}
   