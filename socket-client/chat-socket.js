const socket = io("http://localhost:3000");

const message = document.getElementById("message");
const messages = document.getElementById("message");

const handleSubmitNewMessage = () => {
  socket.emit("message", { data: message.value });
};

socket.on("message", ({ data }) => {
  handleNewMessage(data);
});

handleNewMessage = (message) => {
  message.appendChild();
};

const buildNewMessage = (message) => {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(message));
  return li;
};
