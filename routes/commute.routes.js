const express = require("express")
const router = express.Router();

const commutecontroller = require('../controllers/commute.controller')
router.post('/', commutecontroller.createCommuter);
// router.get('/', ridecontroller.getrides);
router.get('/', commutecontroller.getAllCommute)
router.get('/:id', commutecontroller.getcommuterById)
module.exports = router;