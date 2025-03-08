import roomData from "../../db.js"

const createRoom_on = (socket,io) => {

    socket.on('create room', ( { hostName , sizeOfBoard } , callback ) => {

        // const roomid = generateRoomId();
        const roomid = 1234;
        // create room data
        const room = {
            roomid: roomid ,
            hostName: hostName,
            hostId : socket.id ,
            sizeOfBoard: sizeOfBoard,
            playerLimit : sizeOfBoard ,
            players: [],
            gameStatus: 'lobby'
        }

        console.log(room)

        // add the host room
        const newPlayer = { id : socket.id , name : hostName }
        room.players.push(newPlayer)
        socket.join(roomid);

        // save changes in db
        roomData.set(roomid,room);  

        // return success msg
        callback({msg:'success'});

    })

}

export default createRoom_on;