import roomData from '../../db.js'


const joinRoom_on = (socket,io) => {
    socket.on('join room',( { playerName , roomid } , callback )=>{

        const room = roomData.get(roomid)
        
        // check for the existence of the room
        if(!room) callback({ status : false, msg : 'Room Not Found'})

        // to check whether room has reach the playerLimit
        if(room.players.length >= room.playerLimit) callback({ status : false, msg : 'Room is full'})

        // create a new player object
        const playerData = { id : socket.id , name : playerName }

        // add play to db 
        room.players.push(player)

        //add user to the room
        socket.join(roomid)

        // notify aother players in the room
        io.to(roomid).emit('player joined' , room );

        // notify the player 
        callback({ status : true , msg : 'Player Joined Room' , room : room })

    })
}

export default joinRoom_on;