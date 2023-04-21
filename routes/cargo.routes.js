const express = require("express")
const router = express.Router();

const cargoroutes = require('../controllers/cargo.controller')

router.post('/', cargoroutes.storeCargoRoute);

module.exports=router;