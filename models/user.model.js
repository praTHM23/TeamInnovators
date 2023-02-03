const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 8
    },
    mobile: {
        type: String,
        default: ""
    },
    profile_pic: {
        type: String,
        default: ""
    },
    shortBio: {
        type: String,
        default: ""
    },
    longBio: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        default: ""
    },
    chat_users: {
        type: [Schema.Types.ObjectId],
        ref: "user"
    }
},{timestamps:true});

module.exports = mongoose.model("user", userSchema);