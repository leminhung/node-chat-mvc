const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3000;
const SocketServices = require("./services/chat.service");
const ChatRouter = require("./routes/chat.route");
const res = require("express/lib/response");

// global declarations
global._io = io;
global.__basedir = __dirname;

app.use(express.static("public"));
app.set("view engine", "ejs");

// use middleware for request once
global._io.use((socket, next) => {
  const { token } = socket.handshake.headers;

  // package JWT
  if (token && token === "hellohung") return next();

  next(new Error("Please login to chat with your friend"));
});

global._io.on("connection", SocketServices.connection);

app.get("/", (req, res) => {
  res.render("chat");
});
app.use(ChatRouter);

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
