const express = require("express");

const router = express.Router();
const {decode}=require('../helpers/jwt')

const authRoutes=require("./auth.routes")
const chatRoutes=require('./chatroom.routes')


router.use("/auth", authRoutes);
router.use("/room",decode, chatRoutes);

//all apis will come here













module.exports = router;