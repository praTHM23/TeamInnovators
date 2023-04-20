const express = require("express")
const router = express.Router();

const ridecontroller = require('../controllers/ride.controller')
router.post('/', ridecontroller.createRide);
router.get('/', ridecontroller.getrides);
// router.get('/commuter', ridecontroller.getridesForCommuter)
module.exports = router;