const express = require("express")
const router = express.Router();

const ridecontroller = require('../controllers/ride.controller')
router.post('/', ridecontroller.createRide);
router.get('/commuter', ridecontroller.getridesForCommuter)
router.get('/', ridecontroller.getrides);
module.exports = router;