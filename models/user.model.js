const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        default: "",
        required: false,
        unique: true,
        index: true
    },
    email: {
        type: String,
        // unique: true,
        index: true,
        default: "",
    },
    role: {
        type: String,
        enum: ["commuter", "driver"],
        // default: "",
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);