const express = require("express")
const router = express.Router();
const upload = require("../helpers/multer");
const UserController = require("../controllers/user.controller");
const { verifyUser } = require('../helpers/jwt')



router.patch('/', UserController.updateUser)

module.exports = router;