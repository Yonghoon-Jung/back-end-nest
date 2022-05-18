// const socket = io('/chattings');

// const getElementById = (id) => document.getElementById(id) || null;

// // 돔 엘레멘트
// const helloStrangerElement = getElementById('hello_stranger');
// const chattingBoxElement = getElementById('chatting_box');
// const formElement = getElementById('chat_form');

// // broadcast 수신
// socket.on('user_connected', (username) => {
//   drawNewChat(`${username} connected :)`);
// });
// socket.on('new_chat', (data) => {
//   const { chat, username } = data;
//   drawNewChat(`${username}: ${chat}`);
// });
// socket.on('disconnect_user', (username) => drawNewChat(`${username}: bye...`));

// // 그리는 함수
// const drawHelloStranger = (username) => {
//   helloStrangerElement.innerText = `hello ${username} Stranger :)`;
// };
// const drawNewChat = (message) => {
//   const wrapperChatBox = document.createElement('div');
//   const chatBox = `
//     <div>
//       ${message}
//     </div>
//   `;
//   wrapperChatBox.innerHTML = chatBox;
//   chattingBoxElement.append(wrapperChatBox);
// };

// // 이벤트 콜백 함수
// const handleSubmit = (event) => {
//   event.preventDefault();

//   // submit data 받기
//   const inputValue = event.target.elements[0].value;
//   if (inputValue !== '') {
//     socket.emit('submit_chat', inputValue);
//     // 화면 그리기
//     drawNewChat(`me: ${inputValue}`);
//     event.target.elements[0].value = '';
//   }
//   console.log(inputValue);
// };

// function helloUser() {
//   const username = prompt('What is your name?');
//   socket.emit('new_user', username, (data) => {
//     drawHelloStranger(data);
//   });
// }

// function init() {
//   helloUser();
//   // 이벤트 연결
//   formElement.addEventListener('submit', handleSubmit);
// }

// init();
const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});
socket.on('disconnect_user', (username) => drawNewChat(`${username}: bye...`));

//* event callback functions
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 화면에다가 그리기
    drawNewChat(`me : ${inputValue}`, true);
    event.target.elements[0].value = '';
  }
};

//* draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `Hello ${username} Stranger :)`);
const drawNewChat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox;
  if (!isMe)
    chatBox = `
    <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
      ${message}
    </div>
    `;
  else
    chatBox = `
    <div class='bg-white w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
      ${message}
    </div>
    `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
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
