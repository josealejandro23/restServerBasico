require("dotenv").config();
const ServidorSencillo = require("./models/server");

const serverExpress = new ServidorSencillo();


module.exports = serverExpress;
serverExpress.inicio();