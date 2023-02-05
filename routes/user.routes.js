const express =require("express")
const router=express.Router();
const upload = require("../helpers/multer");
const UserController=require("../controllers/user.controller");

router.get("/", async (req, res) => {
    await UserController.getUsers(req, res);
});
router.get("/:id", async(req,res)=> {
    await UserController.getUser(req, res);
});
router.patch("/:id",upload.single("profile_pic"), async (req, res) => {
    await UserController.updateUser(req, res);
});
router.delete("/:id", async (req, res) => {
    await UserController.deleteUser(req, res);
});

module.exports = router;