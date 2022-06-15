const express = require("express");
const route = express.Router();
const { message } = require("../controllers/chat.controller");

// route.get("/api/message", message);

route.get("/chat", (req, res, next) => {
  res.render("chat");
});

module.exports = route;
