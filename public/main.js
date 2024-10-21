const socket = io(); //"http://localhost:4000",{}

const clientstotalhtml = document.getElementById('clientstotal');
const messagecontainer = document.getElementById('messagecontainer');
const nameinput = document.getElementById('nameinput');
const messageForm = document.getElementById('messageform');
const messageinput = document.getElementById('messageinput');


messageForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    sendmessage();
})

socket.on('clientstotal', (data)=>{
    clientstotalhtml.innerText = `Total Clients: ${data}`;
});

function sendmessage(){
    console.log(messageinput.value);
    const data = {
        name: nameinput.value,
        message: messageinput.value,
        datetime: new Date()
    }
    socket.emit('message',data);
    addmessagetoui(true,data)
    messageinput.value = '';
}

socket.on('chatmessage', (data)=>{
    console.log(data);
    addmessagetoui(false, data)
})

function addmessagetoui(isOwnmessage, data){
    const element = `            
            <li class="${isOwnmessage ? "messageright" :"messageleft"}">
                <p class="message">
                    ${data.message}
                    <span>${data.name} || ${moment(data.dateTime).fromNow()}</span>
                </p>
            </li>`
    messagecontainer.innerHTML += element;
    scrolltobottom();
}

function scrolltobottom(){
    messagecontainer.scrollTo(0,messagecontainer.scrollHeight)
}

messageinput.addEventListener('focus',(e)=>{
    socket.emit('feedback',{
        feedback: `${nameinput.value} is typing a message`
    })
})

messageinput.addEventListener('keypress',(e)=>{
    socket.emit('feedback',{
        feedback: `${nameinput.value} is typing a message`
    })
})
messageinput.addEventListener('blur',(e)=>{
    socket.emit('feedback',{
        feedback: '',
    })
})
