const express = require("express");

const router = express.Router();
const { decode } = require('../helpers/jwt')

const authRoutes = require("./auth.routes")
const rideRoutes = require("../routes/ride.routes");
const commuteRoutes = require("../routes/commute.routes")
const cargoRoutes = require('../routes/cargo.routes')
// const chatRoutes = require('./chatroom.routes')
// const jobRoutes = require("./job.routes")
// const serviceRoutes = require("./service.routes")
// const postRoutes = require("./post.routes")
const userRoutes = require("./user.routes")

const formRoutes = require('../routes/form.routes')

router.use("/auth", authRoutes);
// router.use("/room", chatRoutes);
// // router.use("/job",decode,jobRoutes)
// router.use("/job", jobRoutes)
// router.use("/service", serviceRoutes)
// router.use("/post", postRoutes)
router.use("/user", userRoutes);
router.use("/ride", rideRoutes)
router.use("/commute", commuteRoutes);
router.use('/cargo', cargoRoutes);
//all apis will come here
router.use("/form", formRoutes)














module.exports = router;