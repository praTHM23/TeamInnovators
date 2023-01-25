const User = require('../../models/user.model')
const httpStatusCodes = require("../../constants/http-status-codes");
const { formResponse } = require("../../helpers/response");

const jwtHelper = require('../../helpers/jwt');

const crypto = require('crypto');
const mongoose = require("mongoose");
const conn = require("../../config/db/mongo");

const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const _username = req.body.username;
    const _password = req.body.password;

    const data = {
        email: _username
    }

    try {
        let result = await User.findOne(data).lean();
        console.log(result)
        if (result) {
            //compare passwords 
            if (!(bcrypt.compareSync(_password, result.passwordHash))) {
                res.status(httpStatusCodes[500].code)
                    .json(formResponse(httpStatusCodes[500].code, {
                        message: "Invalid Username or Password. Please try again"
                    }));
            } else {
                const jwt = jwtHelper.generateJwtToken(result._id);
                const userData = (({ _id, passwordHash, ...generalDetails }) => ({ ...generalDetails }))(result);//The _id and password properties are listed before the spread operator ... this means that they are being destructured and removed from the object.
                console.log(userData)
                const response = {
                    user: { ...userData },
                    jwtToken: jwt,

                };

                res.status(httpStatusCodes[200].code)
                    .json(formResponse(httpStatusCodes[200].code, response));
            }
        } else {
            res.status(httpStatusCodes[404].code)
                .json(formResponse(httpStatusCodes[404].code, {
                    message: "Account cannot be found. Try signing up"
                }));
        }
    } catch (err) {
        console.log(err)
        handleError(err, methodName, modelName);
        res.status(httpStatusCodes[500].code)
            .json(formResponse(httpStatusCodes[500].code, {
                message: "Your request could not be processed at this time"
            }));
    }
}


exports.register = async (req, res) => {

    const ipOb = {
        email: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,

    };

    if (!ipOb.email.trim()) {
        res.status(httpStatusCodes[404].code)
            .json(formResponse(httpStatusCodes[404].code, {
                message: "Email is invalid. Try again."
            }));
        return;
    }

    const data = {
        email: ipOb.email
    }

    const session = await conn.startSession();
    session.startTransaction();
    try {
        let result = await User.findOne(data).lean();
        if (result) {
            await session.abortTransaction();
            res.status(httpStatusCodes[400].code)
                .json(formResponse(httpStatusCodes[400].code, {
                    message: "User already exists. Try login"
                }));
            return;
        }
        ipOb.passwordHash = await bcrypt.hash(req.body.password, 10);

        console.log(ipOb.passwordHash)
        let createResult = await User.create(ipOb);
        console.log("he")

        console.log(createResult)
        if (createResult) {
            res.status(httpStatusCodes[200].code)
                .json(formResponse(httpStatusCodes[200].code, {
                    message: "Account created successfully",
                    redirect: true
                }));
        }
        else {
            await session.abortTransaction();
            res.status(httpStatusCodes[500].code)
                .json(formResponse(httpStatusCodes[500].code, {
                    message: "Account cannot be created at this time."
                }));
            return;
        }
    } catch (err) {
        await session.abortTransaction();
        res.status(httpStatusCodes[500].code)
            .json(formResponse(httpStatusCodes[500].code, {
                message: "Your request could not be processed at this time"
            }));
    }

}
