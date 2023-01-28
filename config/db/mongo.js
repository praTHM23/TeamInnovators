const mongoose = require("mongoose"); 

// const uri = process.env.MONGO_URI_MAIN;
const uri = process.env.MONGO_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Connect MongoDB Atlas using mongoose connect method
const conn = mongoose.connection;
conn.openUri(uri, options).then(() => {
    console.log("Database connection established!");
    },
    err => {
        {
            console.log("Error connecting Database instance due to:", err);
        }
    }
);
module.exports = conn
