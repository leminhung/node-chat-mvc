const express = require("express");
const route = express.Router();
const { message } = require("../controllers/chat.controller");

route.get("/api/message", message);

module.exports = route;
