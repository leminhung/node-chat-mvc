const { generateMessage } = require("../utils/message");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../utils/user");
class SocketServices {
  // Socket connection
  connection(socket) {
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        _io.to(user.room).emit(
          "receiveMsg",
          generateMessage({
            name: "admin",
            message: `User with name ${user.username} has left this room`,
          })
        );
        _io.to(user.room).emit("roomData", {
          room: user.room,
          data: getUsersInRoom(user.room),
        });
      }
    });

    socket.on("sendWelcome", ({ username, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, username, room });

      if (error) {
        return callback(error);
      }

      socket.join(user.room);
      socket.broadcast.to(user.room).emit(
        "receiveMsg",
        generateMessage({
          name: "admin",
          message: `User with name ${username} has joined this room`,
        })
      );

      _io.to(user.room).emit("roomData", {
        room: user.room,
        data: getUsersInRoom(user.room),
      });
    });

    // Chat message
    socket.on("chat message", (message) => {
      const user = getUser(socket.id);
      _io
        .to(user?.room)
        .emit("receiveMsg", generateMessage({ name: user?.username, message }));
    });
  }
}

module.exports = new SocketServices();
