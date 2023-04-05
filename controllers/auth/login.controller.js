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
    const user = await User.findOne({ mobile: req.mobile });
    console.log(user);
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
  console.log(req.uid, req.mobile, req.body.first_name, req.body.last_name);
  try {
    const ipObj = {
      full_name: req.body.full_name,
      role: req.body.role,
      mobile: req.mobile
    };
    const user = await User.create(ipObj); // create a new user and store it in a variable

    if (!user) { // if user is not created, send a 404 error response
      return res.status(404).json({ message: 'User not Registered' });
    }

    return res.status(201).json({ message: 'User registered successfully', user }); // send the user data in the response
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
