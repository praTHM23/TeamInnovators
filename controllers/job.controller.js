const Job = require('../models/job.model')
const cloudinary = require('../helpers/cloudinaryUpload')
const User = require("../models/user.model");

// create
// exports.addJob = async (req, res) => {

//     try {
//         // const data={
//         //    UserID: req.userId,
//         //    ...req.body
//         // }
//         // const job = await Job.create(data);
//         console.log(req.body)
//         // Upload image to cloudinary
//         const result = await cloudinary.uploader.upload(req.file.path);

//         // Create new post
//           const job = new Job({
//           UserID: req.body.UserID,
//           title:req.body.title,
//           tags:req.body.tags,
//           Job_Description:req.body.Job_Description,
//           location:req.body.location,
//           budget:req.body.budget,
//           photo_link: result.secure_url,
//           status:req.body.status 
//         });

//         await job.save();
//         res.status(200).send(job);
//     }
//     catch (err){
//         res.send(err);
//     }

// }
// // delete
// exports.deleteJob = async (req, res) => {
//     console.log("deleted job")
//      try {
//          const job = await Job.findByIdAndDelete(req.params.id);
//          res.status(200).send(job);
//      }
//      catch (err){
//          res.send(err);
//      }}

// //get     
// exports.getJob = async (req, res) => {
//     console.log(req.params.id)
//      try {
//          const job = await Job.findById(req.params.id).populate('UserID', ['first_name','last_name','profile_pic']);
//          res.status(200).send(job);
//      }
//      catch (err){
//          res.send(err);
//      }}

// //get all
// exports.getJobs = async (req, res) => {
//     console.log("get all jobs")
//      try {
//          const job = await Job.find().populate('UserID', ['first_name','last_name','profile_pic']);
//          res.status(200).send(job);
//      }
//      catch (err){
//          res.send(err);
//      }}
// //update
// exports.updateJob = async (req, res) => {
//     console.log("update job")
//      try {
//          const job = await Job.findByIdAndUpdate(req.params.id, req.body,);
//          res.status(200).send("updated");
//         }
//         catch (err){
//             res.send(err);
//         }}

//  //get jobs of a particular user
//  exports.getUserJobs= async (req, res) => {

//     try {
//         const jobs = await Job.find({UserID:req.params.id});
//         res.status(200).send(jobs);
//        }
//        catch (err){
//            res.send(err);
//        }}           

// const cloudinary = require('cloudinary').v2;
// const Job = require('../models/Job');

// Create a new job post
exports.createJobPost = async (req, res, next) => {
  try {
    const customer = await User.findById(req.body.customer_id);

    if (!customer || customer.role !== 'customer') {
      return res.status(400).json({
        message: 'Invalid customer ID'
      });
    }

    const picture = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto'
    });

    const job = new Job({
      customer_id: req.body.customer_id,
      start_date: req.body.start_date,
      start_time: req.body.start_time,
      end_date: req.body.end_date,
      budget: req.body.budget,
      location: req.body.location,
      picture: picture.secure_url,
      required_services: req.body.required_services,
      description: req.body.description
    });

    const newJob = await job.save();

    res.status(201).json({
      message: 'Job post created successfully',
      job: newJob
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error creating job post',
      error: error
    });
  }
};


// Get all job posts
exports.getAllJobPosts = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .populate('comments.user', 'name email')
      .populate('customer_id', 'full_name email')
      .populate('assigned_to.service_provider_id', 'full_name email');
    res.status(200).json({
      message: 'Job posts retrieved successfully',
      jobs: jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving job posts',
      error: error
    });
  }
};

// Get a single job post by ID
exports.getJobPostById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('comments.user', 'name email')
      .populate('customer_id', 'full_name email')
      .populate('assigned_to.service_provider_id', 'full_name email');

    if (!job) {
      return res.status(404).json({
        message: 'Job post not found'
      });
    }

    res.status(200).json({
      message: 'Job post retrieved successfully',
      job: job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving job post',
      error: error
    });
  }
};

// Update a job post by ID
exports.updateJobPostById = async (req, res, next) => {
  try {


    console.log(req.body);

    const job = await Job.findById(req.params.id);
    if (Object.keys(req.body).length === 0 && !req.file) {
      return res.status(404).json({ message: 'Request body and file both are empty' });
    }
    let pictureObj = {

    }
    if (req.file != undefined) {
      const picture = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto"
      })
      pictureObj['picture'] = picture.secure_url;
    }
    console.log(pictureObj);

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, {
      ...req.body,
      ...pictureObj
    })
    console.log(updatedJob)
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job Post not found!' });
    }
    const Updatedata = await Job.findById(req.params.id)
    res.status(200).json({
      message: 'Job post updated successfully',
      job: Updatedata
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating job post',
      error: error
    });
  }
};

// Delete a job post by ID
exports.deleteJobPostById = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: 'Job post not found'
      });
    }

    res.status(200).json({
      message: 'Job post deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error deleting job post',
      error: error
    });
  }
};

exports.getAllJobPostsByUser = async (req, res, next) => {
  try {
    console.log(req.params.userId)
    const jobs = await Job.find({ customer_id: req.params.userId });

    res.status(200).json({
      message: 'All job posts by user retrieved successfully',
      jobs: jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving job posts by user',
      error: error
    });
  }
};

exports.assignJob = async (req, res, next) => {
  try {
    const { service_provider_id, start_date, start_time, end_date, budget } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: 'Job post not found'
      });
    }

    if (job.assigned) {
      return res.status(400).json({
        message: 'Job post already assigned'
      });
    }

    // Check if the service provider ID has a role of service provider in the User model
    const user = await User.findById(service_provider_id);

    if (!user || user.role !== 'service_provider') {
      return res.status(400).json({
        message: 'Invalid service provider ID'
      });
    }

    job.assigned = true;
    job.assigned_to = {
      service_provider_id,
      start_date,
      start_time,
      end_date,
      budget,
      completed: 0
    };

    const updatedJob = await job.save();

    res.status(200).json({
      message: 'Job post assigned successfully',
      job: updatedJob
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error assigning job post',
      error: error
    });
  }
};


// Get all assigned jobs
exports.getAssignedJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ assigned: true })
      .populate('customer_id', 'full_name email')
      .populate('assigned_to.service_provider_id', 'full_name email');

    res.status(200).json({
      message: 'Assigned jobs retrieved successfully',
      jobs: jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving assigned jobs',
      error: error
    });
  }
};



// Get a single assigned job by ID
exports.getAssignedJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('customer_id', 'full_name email')
      .populate('assigned_to.service_provider_id', 'full_name email');

    if (!job) {
      return res.status(404).json({
        message: 'Assigned job not found'
      });
    }

    if (!job.assigned) {
      return res.status(404).json({
        message: 'Job post not assigned'
      });
    }

    res.status(200).json({
      message: 'Assigned job retrieved successfully',
      job: job
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving assigned job',
      error: error
    });
  }
};

// Update an assigned job by ID
exports.updateAssignedJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: 'Assigned job not found'
      });
    }

    if (!job.assigned) {
      return res.status(404).json({
        message: 'Job post not assigned'
      });
    }

    const { start_date, start_time, end_date, budget, completed } = req.body;

    // Update assigned job details
    if (start_date) job.assigned_to.start_date = start_date;
    if (start_time) job.assigned_to.start_time = start_time;
    if (end_date) job.assigned_to.end_date = end_date;
    if (budget) job.assigned_to.budget = budget;
    if (completed !== undefined) job.assigned_to.completed = completed;

    const updatedJob = await job.save();

    res.status(200).json({
      message: 'Assigned job updated successfully',
      job: updatedJob
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error updating assigned job',
      error: error
    });
  }
};
// Get all jobs assigned to a specific service provider
exports.getAssignedJobsByServiceProvider = async (req, res, next) => {
  try {
    const jobs = await Job.find({ 'assigned_to.service_provider_id': req.params.id })
      .populate('customer_id', 'full_name email')
      .populate('assigned_to.service_provider_id', 'full_name email');

    res.status(200).json({
      message: 'Assigned jobs retrieved successfully',
      jobs: jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving assigned jobs',
      error: error
    });
  }
};

// Get all jobs assigned to a specific customer
exports.getAssignedJobsByCustomer = async (req, res, next) => {
  try {
    const jobs = await Job.find({ customer_id: req.params.id, assigned: true })
      .populate('customer_id', 'name email')
      .populate('assigned_to.service_provider_id', 'name email');

    res.status(200).json({
      message: 'Assigned jobs retrieved successfully',
      jobs: jobs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error retrieving assigned jobs',
      error: error
    });
  }
};