const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "Please fill in username or room",
    };
  }

  const existingUser = users.find(
    (u) => u.username === username && u.room === room
  );

  if (existingUser) {
    return { error: "User is in use" };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room.trim().toLowerCase());
};

const getUser = (id) => {
  return users.find((u) => u.id === id.trim());
};

const removeUser = (id) => {
  const index = users.findIndex((u) => u.id === id.trim());
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
