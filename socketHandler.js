import createRoom_on from './socket/createRoom/createRoom_on.js'

const socketHandler = (io) => {
    
    console.log("ahndelr instailased")

    io.on( 'connection' , (socket) => {

        console.log("Client connected:", socket.id);

        createRoom_on(socket,io);


    })
}

export default socketHandler;