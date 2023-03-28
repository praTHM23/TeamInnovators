const User = require("../../models/user.model");
const httpStatusCodes = require("../../constants/http-status-codes");
const { formResponse } = require("../../helpers/response");

const jwtHelper = require("../../helpers/jwt");

const crypto = require("crypto");
const mongoose = require("mongoose");
const conn = require("../../config/db/mongo");

const bcrypt = require("bcrypt");
const { userInfo } = require("os");

exports.login = async (req, res) => {


  try {
    console.log(req.mobile)
    const ipObj = req.mobile;
    const user = await User.findOne({ ipObj });

    if (!user) {
      return res.status(404).json({ message: 'User not found try Resgistering!' });
    }

    return res.status(200).json({ user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}
exports.register = async (req, res) => {

  console.log(req.uid, req.mobile, req.role, req.body.first_name, req.body.last_name)
  try {
    const ipObj = {

      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role: req.role,
      mobile: req.mobile
    }
    User.create(ipObj).then(() => {
      return res.status(201).json({ message: 'User Registerd successfully' });
    }).catch(error => {
      console.error(error);
      return res.status(400).json({ message: 'User has not been Register' });
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

};
