class SocketServices {
  // Socket connection
  connection(socket) {
    socket.on("disconnect", () => {
      console.log(`User disconnect with id: ${socket.id}`);
    });

    // Chat message
    socket.on("chat message", (msg) => {
      console.log(`With message: ${msg}`);
      _io.emit("chat message", msg);
    });
  }
}

module.exports = new SocketServices();
