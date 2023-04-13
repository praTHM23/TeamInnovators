const express = require("express")
const router = express.Router();
const upload = require("../helpers/multer");
const jobController = require("../controllers/job.controller")

// router.post("/", upload.single("photo_link"),async (req, res) => {
//     await JobController.addJob(req, res);
// });

// router.get("/", async (req, res) => {
//     await JobController.getJobs(req, res);
// });

// router.get("/:id", async (req, res) => {
//     await JobController.getJob(req, res);
// });

// router.get("/user/:id", async (req, res) => {
//     await JobController.getUserJobs(req, res);
// });

// router.put("/:id", async (req, res) => {
//     await JobController.updateJob(req, res);
// });
// router.delete("/:id", async (req, res) => {
//     await JobController.deleteJob(req, res);
// });

// module.exports = router;
router.post('/', upload.single('picture'), jobController.createJobPost);

router.get('/assigned/:id', jobController.getAssignedJobById);
router.patch('/assigned/:id', jobController.updateAssignedJobById);

router.get('/', jobController.getAllJobPosts);
router.get('/:id', jobController.getJobPostById);
router.put('/:id', upload.single('picture'), jobController.updateJobPostById);
router.delete('/:id', jobController.deleteJobPostById);
router.get('/user/:userId', jobController.getAllJobPostsByUser);

router.patch('/:id/assign', jobController.assignJob);

router.get('/all/assigned', jobController.getAssignedJobs);
router.get('/assigned/service_provider/:id', jobController.getAssignedJobsByServiceProvider);
module.exports = router;