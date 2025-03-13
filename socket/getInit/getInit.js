import roomData from "../../db.js"


const get_init_player_board = (socket , io) => {
    socket.on('get init player board',({roomid},callback)=>{

        // console.log( 'room ' + roomid)

        const room = roomData.get(roomid);

        // console.log(room)

        if(!room) return callback({status:false,msg:"room not found"})

        callback({status:true,player:room.players})
    })
}

const get_init_game_matrix = (socket , io) => {
    socket.on('get init',({roomid},callback)=>{
        
    })
}

// const get_init_game_matrix = (socket , io) => {
//     socket.on('get init',({roomid},callback)=>{
        
//     })
// }


export  {get_init_player_board , get_init_game_matrix } ;