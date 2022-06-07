const { generateMessage } = require("../utils/message");
class SocketServices {
  // Socket connection
  connection(socket) {
    socket.on("disconnect", () => {
      console.log(`User disconnect with id: ${socket.id}`);
    });

    // Chat message
    socket.on("chat message", (message) => {
      console.log(`With message: ${message}`);
      _io
        // .to("123")
        .emit("chat message", generateMessage({ name: "Hung", message }));
    });
  }
}

module.exports = new SocketServices();
