var socket = io({
  extraHeaders: {
    token: "hellohung",
  },
});

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function (data) {
  const { name, message, createdAt } = data;
  console.log(data);
  var item = document.createElement("li");
  item.textContent = message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on("connect_error", (err) => {
  console.log("err-", err.message);
});
