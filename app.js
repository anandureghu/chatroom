// Dom elements
const list = document.querySelector('.message-list');

// Class Instances
const room = new Chatroom("Goku", "general");
const ui = new ChatUI(list);

// Get chats and render
room.getChats(data => ui.render(data));