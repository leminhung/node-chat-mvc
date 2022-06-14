const { generateMessage } = require("../utils/message");
const {
  addUser,
  removeUser,
  getUser,
  getListUsersInRoom,
} = require("../utils/user");
class SocketServices {
  // Socket connection
  connection(socket) {
    socket.on("disconnect", () => {
      console.log(`User disconnect with id: ${socket.id}`);
    });

    socket.on("sendWelcome", ({ username, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, username, room });

      if (error) {
        return callback(error);
      }

      socket.join(user.room);
      socket.broadcast.to(user.room).emit(
        "receiveUser",
        generateMessage({
          name: "admin",
          message: `User with name ${username} has joined this room`,
        })
      );

      _io.to(user.room).emit("roomData", {
        room: user.room,
        data: getListUsersInRoom(user.room),
      });
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
