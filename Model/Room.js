import mongoose from "mongoose";


const roomSchema  = new mongoose.Schema({
    room_id : {
        type : String ,
        required : true ,
    },
    host_name : {
        type : String ,
        required : true ,
    },
    players:{
        type : [
            {
                name: { type: String, required: true },
                id: { type: String, required: true },
                is_crossed : {type : Boolean , default : false } ,
                winner : { type:Number , default : -1 }
            }
        ] ,
        default : []
    },
    host_id : {
        type : String ,
        required : true ,
    },
    size_of_board : {
        type : Number ,
        required : true ,
    },
    player_limit : {
        type : Number ,
        required : true ,
    },
    game_status : {
        type : String ,
        default : 'lobby'
    },
    boardState :{
        type : [
           { id : String , board :[Number]}
        ],
        default : []
    },
    all_crossed_number : {
        type : [Number],
        default : []
    },
    winner_count : {
        type : Number,
        default : 0
    },
    curr_turn : {
        type : {
            id : String ,
            name : String ,
            choosen_number : {
                type : Number,
                default : -1 
            }
        }
    }

})

const Room = mongoose.model('Room', roomSchema);

export default Room;

// room.boardState = boardState;
// room.numberCrossedStatus = numberCrossedStatus;
// room.allCrossedNumber = allCrossedNumber;
// room.currRound =  {id : room.players[0].id , name : room.players[0].name , choosen_number : -1};
// room.numCrossedInCurrRound = numCrossedInCurrRound;
// room.gameStatus = "game started" ;
// room.currTurn = 0 ;
// room.winner = winner ;
// room.roundNumber = 1 ;



