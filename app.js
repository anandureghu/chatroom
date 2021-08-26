// Dom elements
const list = document.querySelector('.message-list');
const chatForm = document.querySelector('.chat-form');
const nameForm = document.querySelector('.name-form');
const messages = document.querySelector('.messages');
const channels = document.querySelector('.channel');

channels.addEventListener('click', e => {
    if(e.target.tagName === "BUTTON"){
        const channel = e.target.getAttribute('id');
        list.innerHTML = "";
        room.updateChannel(channel);
        room.getChats( chat => ui.render(chat));

    }
});

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = chatForm.message.value.trim();
    if(message){
        room.addChat(message);
    }
    chatForm.reset();
});

nameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameForm.name.value.trim();
    if(name){
        room.updateName(name);
    }
    nameForm.name.setAttribute('placeholder', name);
    nameForm.reset();
});

// Chcking for username already set or not
if(localStorage.getItem('chatroomUsername')){
    username = localStorage.getItem('chatroomUsername');
}else{
    username = "anonymous";
}
nameForm.name.setAttribute('placeholder', username);
// Class Instances
const room = new Chatroom(username, "general");
const ui = new ChatUI(list);

// Get chats and render
room.getChats(data => ui.render(data));

console.log(messages.clientHeight);