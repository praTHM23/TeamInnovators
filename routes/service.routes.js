const express =require("express")
const router=express.Router();
const upload = require("../helpers/multer");
const ServiceController=require("../controllers/service.controller")

router.post("/", upload.single("serviceImage"), async (req, res) => {
    await ServiceController.addService(req, res);
});

router.get("/", async (req, res) => {
    await ServiceController.getServices(req, res);
});

router.get("/:id", async (req, res) => {
    await ServiceController.getService(req, res);
});

router.get("/user/:id", async (req, res) => {
    await ServiceController.getUserServices(req, res);
});

router.put("/:id", async (req, res) => {
    await ServiceController.updateService(req, res);
});
router.delete("/:id", async (req, res) => {
    await ServiceController.deleteService(req, res);
});

module.exports = router;