import roomData from "../../db.js"


const get_init_player_board = (socket , io) => {
    socket.on('get init player board',({roomid},callback)=>{

        const room = roomData.get(roomid);
        if(!room) return callback({status:false,msg:"room not found"})
        callback({status:true,player:room.players})
    
    })
}

const get_init_game_status = (socket , io) => {

    socket.on('get init game status',( {roomid} , callback )=>{
        const room = roomData.get(roomid);
        if(!room) return callback({status:false , gameStatus:"room not found"})
        console.log(room)
        return callback({status:true , gameStatus:room.gameStatus})
    })

}



export  { get_init_player_board , get_init_game_status } ;