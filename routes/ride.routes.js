const express = require("express")
const router = express.Router();

const ridecontroller = require('../controllers/ride.controller')
router.put('/generate/otp/:id', ridecontroller.generateRideOTP)
router.post('/', ridecontroller.createRide);
router.post('/commuter', ridecontroller.getridesForCommuter)
router.get('/', ridecontroller.getrides);
router.patch('/accept-req/:id', ridecontroller.updateRideWithCommuter);
module.exports = router;