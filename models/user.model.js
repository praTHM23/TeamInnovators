const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({

    full_name: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        default: ""
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
    }
    // profile_pic: {
    //     type: String,
    //     default: ""
    // },
    // bio: {
    //     type: String,
    //     default: ""
    // },
    // gender: {
    //     type: String,
    //     default: ""
    // },
    // address: {
    //     type: String,
    //     default: "",
    // },
    // state: {
    //     type: String,
    //     default: "Goa"
    // },
    // role: {
    //     type: String,
    //     enum: ["customer", "service_provider"],
    //     default: "",
    // }
    // ,
    // skills: {
    //     type: [String],
    //     default: null,
    // }
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);