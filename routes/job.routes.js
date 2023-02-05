const express =require("express")
const router=express.Router();
const upload = require("../helpers/multer");
const JobController=require("../controllers/job.controller")

router.post("/", upload.single("photo_link"),async (req, res) => {
    await JobController.addJob(req, res);
});

router.get("/", async (req, res) => {
    await JobController.getJobs(req, res);
});

router.get("/:id", async (req, res) => {
    await JobController.getJob(req, res);
});

router.get("/user/:id", async (req, res) => {
    await JobController.getUserJobs(req, res);
});

router.put("/:id", async (req, res) => {
    await JobController.updateJob(req, res);
});
router.delete("/:id", async (req, res) => {
    await JobController.deleteJob(req, res);
});

module.exports = router;