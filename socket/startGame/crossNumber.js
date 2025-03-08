import roomData from "../../db";


const crossNumber = (socket,id) => {

    socket.on( 'cross number' , ( {roomid} , callback ) => {
        const room = roomData.get(roomid) ;

        if(!room) callback( { status : false , msg : 'game is over already' } )
        
        room.numCrossedInCurrRound += 1;

        // check if all players have crossed the number
        if( room.numCrossedInCurrRound != room.players.length ) {

            // mark the crossed player as true
            numberCrossedStatus.forEach(player => {
                if(player.id == socket.id) {
                    player.isCrossed = true
                    // update player borad by emit || yet to be created
                    callback({status:true});
                }
            });
            
        }
        
        
        room.numCrossedInCurrRound = 0;
        room.currRound += 1;
        numberCrossedStatus.forEach(player => {
            player.isCrossed = false
        });

        // update player borad by emit || yet to be created || this must be a brodcast !!

        
        if(room.currTurn == room.players.length) currTurn = 0;
        room.currTurn += 1;
        
        io.to(roomid).emit('player turn' , { id : room.players[room.currTurn].id } ); // this need decision to make
        

    })

}

export default crossNumber ;

// room.set(boardState,[]);
// room.set(numberCrossedStatus,[]);   // note the numberCrossedStatus of player
// room.set(allCrossedNumber,[]);      // track all the crossed num in order
// room.set(currRound,1);          // note the currround 
// room.set(numCrossedInCurrRound,0);     // track the curr no crossed in this round
// room.gameStatus = 'game started' // change status to 'game started'