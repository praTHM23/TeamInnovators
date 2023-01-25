const dotenv = require('dotenv');

const configs = dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}`.trimEnd() });

module.exports = configs;