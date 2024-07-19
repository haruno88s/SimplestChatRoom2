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
                    <span>${data.name} || ${(data.datetime)}</span>
                </p>
            </li>`
    messagecontainer.innerHTML += element;
}