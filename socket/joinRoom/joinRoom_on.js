import roomData from '../../db.js'


const joinRoom_on = (socket,io) => {

    console.log("JOIN ROOM LISTER IS ACTIVE")

    socket.on('join room',( { playerName , roomid } , callback )=>{

        const room = roomData.get(roomid)
        
        
        // check for the existence of the room 
        if(!room) return callback({ status : false, msg : 'Room Not Found'})
        
        // check for room status id full return false callback

        // to check whether room has reach the playerLimit
        if(room.players.length >= room.playerLimit) return callback({ status : false, msg : 'Room is full'})

        // create a new player object
        const playerData = { id : socket.id , name : playerName }

        // add play to db 
        room.players.push(playerData)

        //add user to the room
        socket.join(roomid)

        console.log(room.players);

        // notify aother players in the room
        io.to(roomid).emit('player joined' , { player : room.players} );

        // notify the player
        return  callback({ status : true , msg : 'Player Joined Room' , room : room })

    })
}

export default joinRoom_on;