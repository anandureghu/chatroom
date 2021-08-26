class Chatroom{
    constructor(username, channel){
        this.room = db.collection('chatroom');
        this.username = username;
        this.channel = channel;
        this.unsub;
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
        this.unsub = this.room
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

    updateChannel(channel){
        this.channel = channel;
        console.log("Channel Updated")
        if(this.unsub){
            this.unsub();
        }
        
    }

    updateName(username){
        this.username = username; 
        console.log("Username Changed")
    }
}