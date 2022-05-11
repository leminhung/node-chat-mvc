const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 3000;
const SocketServices = require("./services/chat.service");
const ChatRouter = require("./routes/chat.route");

// global declarations
global._io = io;
global.__basedir = __dirname;

app.use(ChatRouter);

global._io.on("connection", SocketServices.connection);

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
