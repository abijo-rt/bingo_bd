import roomData from '../../db.js'
import Room from '../../Model/Room.js'


const add_player = async (socket, playerName, roomid,io) => {

    console.log("PLAYER NAME  " + roomid)
    const query = { room_id: roomid };
    const update = { $push: { players: { name: playerName, id: socket.id } } };

    try
    {

        const player_len = await Room.findOne({ room_id: roomid });
        
        if (!player_len) return { status: false, msg: 'Room not found' }
        console.log(player_len.player_limit + " " + player_len.players.length)
        if (player_len.players.length >= player_len.player_limit) return { status: false, msg: 'Room is full' }

        const room = await Room.findOneAndUpdate(query, update, { new: true })
        console.log(room)

        socket.join(roomid)
        io.to(roomid).emit('player joined', { player: room.players });

        return { status: true, msg: 'Player added successfully', room: room }

    } catch (err)
    {   
        console.log(err)
        return { status: false, msg: ' Somthing went wrong ' }
    }

}

const joinRoom_on = (socket, io) => {

    console.log("JOIN ROOM LISTER IS ACTIVE")

    socket.on('join room', ({ playerName, roomid }, callback) => {


        const room = roomData.get(roomid)

        add_player(socket, playerName, roomid,io)
            .then(
                (res) =>{
                    console.log(res)    
                    callback(res)
                })



        const playerData = { id: socket.id, name: playerName }
        room.players.push(playerData)

        // check for the existence of the room 
        // if(!room) return callback({ status : false, msg : 'Room Not Found'})

        // check for room status id full return false callback
        // 
        // to check whether room has reach the playerLimit
        // if(room.players.length >= room.playerLimit) return callback({ status : false, msg : 'Room is full'})

        // create a new player object

        // add play to db 

        // add user to the room
        // socket.join(roomid)

        // console.log(room.players);

        // notify aother players in the room
        // io.to(roomid).emit('player joined' , { player : room.players} );

        // notify the player
        // return  callback({ status : true , msg : 'Player Joined Room' , room : room })

    })
}

export default joinRoom_on;