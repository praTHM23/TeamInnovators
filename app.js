const config = require('./config/environments');
const path = require('path');
const http = require("http");
const  WebSockets  = require('./helpers/webSockets')
require("./config/db/mongo");
const socketio = require("socket.io")
//api route
const apiRoutes = require('./routes/index')

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { application } = require('express');
const app = express();

console.log(`NODE_ENV=${process.env.NODE_ENV}`);


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use("/api/v1/", apiRoutes)
app.get('/api/v1/', (req, res) => {
    res.send('Welcome to the home page of WORKIT!')
})
const server = app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection)
// const server = http.createServer(app);
// global.io = socketio.listen(server);
// global.io.on('connection', WebSockets.connection)
// server.listen(process.env.PORT);
// server.on("listening", () => {
//     console.log(`Listening on port:: http://localhost:${port}/`)
// });
module.exports = app;