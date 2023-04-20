const express = require("express")
const router = express.Router();
const { verifyUser } = require('../helpers/jwt')
const AuthController = require("../controllers/auth/auth.controller")

// router.post("/login", verifyUser, async (req, res) => {
//     await AuthController.login(req, res);
// });

router.post("/register", verifyUser, AuthController.register);
router.get("/login", verifyUser, AuthController.login);
module.exports = router;