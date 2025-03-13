import roomData from "../../db";

// this func is emitted when  a single player completes his game
const gameOver = (socket,io) => {
    socket.on('game Over',( { roomid } , callback )=>{
        
        const room = roomData;

        if(!room) callback({status:false,msg:'somting wentWrong'})
            

        room.winner.push(socket.id);   
        // check if 3 player have finished there match
        if( room.winner.length == 3 ) io.to(roomid).emit('result',{winner : room.winner}) // recheck what is return here

    })
}

export default gameOver;

// room.set(boardState,[]);
// room.set(numberCrossedStatus,[]);   // note the number Crossed Status of player for the current round
// room.set(allCrossedNumber,[]);      // track all the crossed num in order durring the whole game
// room.set(currRound,1);          // note the currround 
// room.set(numCrossedInCurrRound,0);     // track the curr no crossed in this round
// room.gameStatus = 'game started' // change status to 'game started'
// room.set(currTurn,1);
// room.set(winner,[]); // store the first three winner