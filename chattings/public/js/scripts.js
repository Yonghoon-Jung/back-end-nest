const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

// 돔 엘레멘트
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// broadcast 수신
socket.on('user_connected', (username) => {
  console.log(`${username} connected :)`);
});

// 그리는 함수
const drawHelloStranger = (username) => {
  helloStrangerElement.innerText = `hello ${username} Stranger :)`;
};

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
}

init();
