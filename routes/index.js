const express = require("express");

const router = express.Router();
const {decode}=require('../helpers/jwt')

const authRoutes=require("./auth.routes")
const chatRoutes=require('./chatroom.routes')
const jobRoutes=require("./job.routes")
const serviceRoutes=require("./service.routes")
const postRoutes=require("./post.routes")
const userRoutes=require("./user.routes")

router.use("/auth", authRoutes);
router.use("/room",decode, chatRoutes);
// router.use("/job",decode,jobRoutes)
router.use("/job",jobRoutes)
router.use("/service",serviceRoutes)
router.use("/post",postRoutes)
router.use("/user",userRoutes);
//all apis will come here













module.exports = router;