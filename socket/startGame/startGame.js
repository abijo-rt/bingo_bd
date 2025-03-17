import roomData from '../../db.js'
import generateBoardState from '../../utils/generateBoardState.js';




const startGame = ( socket , io ) => {

    socket.on('init game' , ( { roomid } , callback )=>{

        console.log(roomid)
        const room = roomData.get(String(roomid));

        // check the presence of board
        if(!room) return callback({ status:false , message:'Room no longer exisit' });
        
        // check if the game is already started
        if( room.gameStatus != 'lobby' ) return callback( { status : false , msg:'Game Already started' } )
            
        const boardSize = room.sizeOfBoard;
        
        //create and insert gameState
        const boardState = [];
        const numberCrossedStatus = [];
        const allCrossedNumber = [];
        const numCrossedInCurrRound = 0;
        const currPlayerTurn = room.players[0];
        const winner = [];

        room.boardState = boardState;
        room.numberCrossedStatus = numberCrossedStatus;
        room.allCrossedNumber = allCrossedNumber;
        room.currRound =  {id : room.players[0].id , name : room.players[0].name , choosen_number : -1};
        room.numCrossedInCurrRound = numCrossedInCurrRound;
        room.gameStatus = "game started" ;
        room.currTurn = 0 ;
        room.winner = winner ;
        room.roundNumber = 1 ;
        // room.currPlayerTurn

        // room.set(boardState,[]);
        // room.set(numberCrossedStatus,[]);   // note the number Crossed Status of player for the current round
        // room.set(allCrossedNumber,[]);      // track all the crossed num in order durring the whole game
        // room.set(currRound,1);              // note the currround 
        // room.set(numCrossedInCurrRound,0);  // track the curr no crossed in this round
        // room.gameStatus = 'game started'    // change status to 'game started'
        // room.set(currPlayerTurn ,room.players[0]);       // curr player turn
        // room.set(choosen_number,-1)         // this is the first choosen number before player 1
        // room.set(winner,[]);                // store the first three winner
        

        //send random game state to each user ;
        for( let i = 0 ; i < room.players.length ; i++ ){
            
            const board = generateBoardState(boardSize) 
            const playerBoardState = { id : room.players[i].id , board:board }
            io.to(room.players[i].id).emit('game state' , playerBoardState );
            room.boardState.push(playerBoardState)
            room.numberCrossedStatus.push({id : room.players[i].id  , isCrossed : false })

        }

        console.log(io.sockets.adapter.rooms); // Check active rooms
        console.log(room.currRound)
        io.to(String(roomid)).emit('listen to game status', "game started"  )
        io.to(String(roomid)).emit( 'player turn' , { player_turn : room.currRound}  );
        console.log("GAME STARTED!");

    })

}

export default startGame ; 