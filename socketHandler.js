import createRoom_on from './socket/createRoom/createRoom_on.js'
import joinRoom_on from './socket/joinRoom/joinRoom_on.js';
import { get_init_player_board } from './socket/getInit/getInit.js';
import startGame from './socket/startGame/startGame.js';
const socketHandler = (io) => {
    
    console.log("ahndelr instailased")

    io.on( 'connection' , (socket) => {

        console.log("Client connected:", socket.id);

        createRoom_on(socket,io);
        joinRoom_on(socket,io);
        get_init_player_board(socket,io);
        startGame(socket,io)


    })
}

export default socketHandler;