 



class Chatroom{
    constructor(username, channel){
        this.room = db.collection('chatroom');
        this.username = username;
        this.channel = channel;
    }

    async addChat(message){
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            channel: this.channel,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.room.add(chat);
        return response;
    }

    getChats(callback){
        this.room
        .where('channel', '==', this.channel)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === "added"){
                    callback(change.doc.data());
                }
            });
        });
    }
}

const room = new Chatroom("john", "gaming");
// console.log(room);
// room.addChat("Hey there")
// .then(() => {
//     console.log("Chat added")
// })
// .catch(err => {
//     console.log(err);
// });
room.getChats(data => {
    console.log(data);
});