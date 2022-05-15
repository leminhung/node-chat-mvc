const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 3000;
const SocketServices = require("./services/chat.service");
const ChatRouter = require("./routes/chat.route");

// global declarations
global._io = io;
global.__basedir = __dirname;

app.use(ChatRouter);

// use middleware for request once
global._io.use((socket, next) => {
  const { token } = socket.handshake.headers;

  // package JWT
  if (token && token === "hellohung") return next();

  next(new Error("Please login to chat with your friend"));
});

global._io.on("connection", SocketServices.connection);

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
