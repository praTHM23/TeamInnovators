const express =require("express")
const router=express.Router();
const upload = require("../helpers/multer");
const cloudinary= require('../helpers/cloudinaryUpload')
const PostController=require("../controllers/post.controller")

router.post("/", upload.single("photo_link"),async (req, res) => {
    await PostController.addPost(req, res);
});

router.get("/", async (req, res) => {
    await PostController.getPosts(req, res);
});

router.get("/:id", async (req, res) => {
    await PostController.getPost(req, res);
});

router.get("/user/:id", async (req, res) => {
    await PostController.getUserPosts(req, res);
});

router.put("/:id", async (req, res) => {
    await PostController.updatePost(req, res);
});
router.delete("/:id", async (req, res) => {
    await PostController.deletePost(req, res);
});

module.exports = router;