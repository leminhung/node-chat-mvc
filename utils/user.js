const users = [];

const addUser = ({ userId, username, roomId }) => {
  username = username.trim().toLowerCase();
  roomId = roomId.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: "Please fill in username or roomId",
    };
  }

  const existingUser = users.find(
    (u) => u.userId === userId || u.roomId === roomId
  );

  if (existingUser) {
    return { error: "User is in use" };
  }

  const user = { userId, username, roomId };
  users.push(user);
  return user;
};

const getListUsersInRoom = (roomId) => {
  return users.filter((u) => u.roomId != roomId.trim().toLowerCase());
};

const getUser = (userId) => {
  return users.find((u) => u.userId === userId.trim().toLowerCase());
};

const removeUser = (userId) => {
  const index = users.find((u) => u.userId === userId.trim().toLowerCase());
  if (index != -1) {
    return users.splice(index, 1)[0];
  }
};
