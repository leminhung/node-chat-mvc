const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  console.log({ id, username, room });
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

const getListUsersInRoom = (room) => {
  const list = users.filter((user) => user.room !== room.trim().toLowerCase());
  console.log("list-", list);
  return list;
};

const getUser = (id) => {
  return users.find((u) => u.id === id.trim().toLowerCase());
};

const removeUser = (id) => {
  const index = users.find((u) => u.id === id.trim().toLowerCase());
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getListUsersInRoom,
};
