const socket = io({
  extraHeaders: {
    token: "hellohung",
  },
});

const messages_list = document.getElementById("messages_list");
const messages = document.getElementById("messages");
const form = document.getElementById("chatForm");
const input = document.getElementById("message");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function (data) {
  const { name, message, createdAt } = data;
  timer = new Date(createdAt);
  messages_list.innerHTML =
    messages_list.innerHTML +
    `<li><span class="badge badge-primary">${name}</span> <span style="color: gray">${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}</span> <p>${message}</p></li>`;
  messages.scrollTop = messages.scrollHeight;
});

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
socket.emit("sendWelcome", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

socket.on("roomData", ({ room, data }) => {
  document.getElementById("roomName").innerHTML = room;

  roomData = "";
  data.forEach((user) => {
    console.log(user);
    roomData += `<li><span class="badge badge-warning">${user.username}</span></li>`;
  });

  document.getElementById("roomData").innerHTML = roomData;
});

socket.on("receiveUser", (msg) => {
  const { text, createdAt, username } = msg;
  timer = new Date(createdAt);
  messages_list.innerHTML =
    messages_list.innerHTML +
    `<li><span class="badge badge-primary">${username}</span> <span style="color: gray">${timer.getHours()}:${timer.getMinutes()}:${timer.getSeconds()}</span> <p>${text}</p></li>`;
  messages.scrollTop = messages.scrollHeight;
});

socket.on("connect_error", (err) => {
  console.log("err-", err.message);
});
