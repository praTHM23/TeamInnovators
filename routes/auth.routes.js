const express = require("express")
const router = express.Router();
const { verifyUser } = require('../helpers/jwt')
const AuthController = require("../controllers/auth/login.controller")

router.post("/login", verifyUser, async (req, res) => {
    await AuthController.login(req, res);
});

router.post("/register", verifyUser, async (req, res, next) => {
    await AuthController.register(req, res, next);
});


module.exports = router;