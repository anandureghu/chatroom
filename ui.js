class ChatUI{
    constructor(list){
        this.list = list;
    }

    render(data){
        const html = `
        <li class="list-group-item text-left">
            <span class="font-weight-bolder">${data.username}</span>
            <span>${data.message}</span>
            <br>
            <span class="text-muted time">${data.created_at.toDate().toLocaleString()}</span>
        </li>;
        `
        this.list.innerHTML += html;
    }
}