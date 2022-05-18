const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

// 돔 엘레멘트
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// broadcast 수신
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected :)`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});
socket.on('disconnect_user', (username) => drawNewChat(`${username}: bye...`));

// 그리는 함수
const drawHelloStranger = (username) => {
  helloStrangerElement.innerText = `hello ${username} Stranger :)`;
};
const drawNewChat = (message) => {
  const wrapperChatBox = document.createElement('div');
  const chatBox = `
    <div>
      ${message}
    </div>
  `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

// 이벤트 콜백 함수
const handleSubmit = (event) => {
  event.preventDefault();

  // submit data 받기
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 화면 그리기
    drawNewChat(`me: ${inputValue}`);
    event.target.elements[0].value = '';
  }
  console.log(inputValue);
};

function helloUser() {
  const username = prompt('What is your name?');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  // 이벤트 연결
  formElement.addEventListener('submit', handleSubmit);
}

init();
