import roomData from "../../db.js";


const crossNumber = (socket,io) => {

    socket.on( 'cross number' , ( {roomid,num} , callback ) => {
        
        const room = roomData.get(String(roomid)) ;
        if(!room) return callback( { status : false , msg : 'game is over already' } )
        
        room.numCrossedInCurrRound += 1;
        console.log("player creossed")
        // check if all players have crossed the number
        if( room.numCrossedInCurrRound != room.players.length ) {

            // mark the crossed player as true
            room.numberCrossedStatus.forEach(player => {
               if(player.id == socket.id) {
                    player.isCrossed = true
                    // update player borad by emit || yet to be created
                }
            });
            
            io.to(String(roomid)).emit('players crossed',room.numberCrossedStatus);
            return callback({status:true});
        }
        
        room.numCrossedInCurrRound = 0;
        room.roundNumber += 1;
        room.numberCrossedStatus.forEach(player => {
            player.isCrossed = false
        });
        
        // update player borad by emit || yet to be created || this must be a brodcast !!
        io.to(String(roomid)).emit('players crossed',room.numberCrossedStatus);
        
        room.currTurn += 1;
        if(room.currTurn == room.players.length) room.currTurn = 0;
        console.log(room.currTurn)
        room.currRound =  {id : room.players[room.currTurn].id , name : room.players[room.currTurn].name , choosen_number : -1};
        
        io.to(String(roomid)).emit('player turn' , { player_turn : room.currRound } ); // this need decision to make
        

    })

    socket.on('set choosen number',({roomid,box_num} , callback )=>{

        console.log("RECI CHHOSEN" + roomid + " " + box_num);
        console.log(roomid);

        const room = roomData.get(String(roomid)) ;

        if(!room) return callback( { status : false , msg : 'game is over already' } )
    
        room.allCrossedNumber.push(box_num);
        io.to(String(roomid)).emit('number choosen',(box_num));
 
    })

}

export default crossNumber ;

// room.set(boardState,[]);
// room.set(numberCrossedStatus,[]);   // note the numberCrossedStatus of player
// room.set(allCrossedNumber,[]);      // track all the crossed num in order
// room.set(currRound,1);         // note the currround 
// room.set(numCrossedInCurrRound,0);     // track the curr no crossed in this round
// room.gameStatus = 'game started' // change status to 'game started'