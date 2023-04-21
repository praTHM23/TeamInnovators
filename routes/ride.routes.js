const express = require("express")
const router = express.Router();

const ridecontroller = require('../controllers/ride.controller')
router.post('/', ridecontroller.createRide);
router.post('/commuter', ridecontroller.getridesForCommuter)
router.get('/', ridecontroller.getrides);
router.get('/:id', ridecontroller.getRidebyUserID)
router.patch('/accept-req/:id',ridecontroller.updateRideWithCommuter);
module.exports = router;