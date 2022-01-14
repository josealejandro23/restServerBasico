require("dotenv").config();
const ServidorSencillo = require("./models/server");

const serverExpress = new ServidorSencillo();

serverExpress.inicio();
