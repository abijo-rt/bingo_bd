import roomData from '../../db.js'
import generateBoardState from '../../utils/generateBoardState.js';




const startGame = ( socket , io ) => {

    socket.on('init game' , ( { roomid } , callback )=>{

        const room = roomData.get(roomid);
        const boardSize = room.sizeOfBoard;


        // check the presence of board
        if(!room) callback({ status:false , message:'Room no longer exisit' });

        // check if the game is already started
        if( room.gameStatus != 'lobby' ) callback( { status : false , msg:'Game Already started' } )

        //create and insert gameState
        room.set(boardState,[]);
        room.set(numberCrossedStatus,[]);   // note the number Crossed Status of player for the current round
        room.set(allCrossedNumber,[]);      // track all the crossed num in order durring the whole game
        room.set(currRound,1);          // note the currround 
        room.set(numCrossedInCurrRound,0);     // track the curr no crossed in this round
        room.gameStatus = 'game started' // change status to 'game started'
        room.set(currTurn,1);
        
        //send random game state to each user ;
        for( i = 0 ; i < room.users.length ; i++ ){
            
            const board = generateBoardState(boardSize) 
            const playerBoardState = { id : players[i].id , board:board }
            io.to(players[i].id).emit('game state' , playerBoardState );
            room.boardState.push(playerBoardState)
            room.numberCrossedStatus.push({id : players[i].id  , isCrossed : false })

        }

        
        setTimeout(() => {
            io.to(roomid).emit('player turn' , { id : room.players[0].id } );
        }, 1000);

        





    })
}

export default startGame ; 