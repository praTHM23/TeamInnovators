const express = require("express")
const router = express.Router();
const upload = require("../helpers/multer");

const formcontroller = require('../controllers/form.controller')

router.post('/', upload.single('photo'), formcontroller.createForm);
router.get('/', formcontroller.getForms);
module.exports = router;