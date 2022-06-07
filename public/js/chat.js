var socket = io({
  extraHeaders: {
    token: "hellohung",
  },
});

var messages_list = document.getElementById("messages_list");
var messages = document.getElementById("messages");
var form = document.getElementById("chatForm");
var input = document.getElementById("message");

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

socket.on("connect_error", (err) => {
  console.log("err-", err.message);
});
