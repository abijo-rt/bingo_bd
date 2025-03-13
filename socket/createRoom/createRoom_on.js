import roomData from "../../db.js"

const createRoom_on = (socket,io) => {  

    console.log("CREATE ROOM LISTER IS ACTIVE")

    socket.on('create room', ( { hostName , sizeOfBoard } , callback ) => {

        console.log("ROOM CREATED")
        // const roomid = generateRoomId();
        const roomid = "1234";
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


        // add the host room
        const newPlayer = { id : socket.id , name : hostName }
        room.players.push(newPlayer)
        socket.join(roomid);

        // save changes in db
        roomData.set(roomid,room);  

        // return success msg
        return callback({status:true ,msg:'success'});

    })

}

export default createRoom_on;