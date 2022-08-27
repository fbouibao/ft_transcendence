var socket = io('http://localhost:8080', { transports: ['websocket'] });

const message = document.getElementById('message');
const messages = document.getElementById('messages');
const createNewRoom = document.getElementById('createNewRoom');

const handleSubmitNewMessage = () => {
    socket.emit('message', { data: message.value });
}


// socket.on('message', ({ data }) => {
//     // handleNewMessage(data);
//     console.log(data);
// })


// const handleNewMessage = (message) => {
    //     messages.appendChild(buildNewMessage(message));
    // }
    
    // const buildNewMessage = (message) => {
        //     const li = document.createElement("li");
        //     li.appendChild(document.createTextNode(message));
        //     return li;
        // }
        
        
const handleSubmitCreateNewRoom = () => {
    socket.emit('createRoom', { title: "topic#", description: "desc topic#", privacy: true, password: "pass123", owner: { id: +createNewRoom.value, name: null } });
}

socket.on('createRoom', ({ test, create }) => {
    console.log(create);
    if (create)
    {
        console.log("room => " + test.id + " " + test.title + " " + test.description + " " + test.privacy + " " + " " + " " + test.owner.id + " " + test.owner.name + " " + test.title);
    }
})


// const dislplayAllRooms = () => {
//     socket.emit('createRoom', { title: "topic#", description: "desc topic#", privacy: true, owner: +createNewRoom.value });
// }

window.addEventListener('load', function () {
    socket.emit('findAllRooms');
})

socket.on('findAllRooms', ({ rooms }) => {
    for (let index = 0; index < rooms.length; index++) {
        const element = rooms[index];
        
        console.log("room => " + element.id + " " + element.title + " " + element.description + " " + element.privacy + " " + " " + " " + element.owner.id + " " + element.owner.name + " " + element.title);
    }
})




