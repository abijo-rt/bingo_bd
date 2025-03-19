import roomData from "../../db.js";
import Room from "../../Model/Room.js";

const crossNumber = (socket, io) => {
  socket.on("cross number", async ({ roomid, num }, callback) => {

    const room = roomData.get(String(roomid));
    if (!room) return callback({ status: false, msg: "Game is over already" });

    const roomtemp = await Room.findOne({ room_id: roomid });
    if (!roomtemp) return callback({ status: false, msg: "Room not found in DB" });

    room.numCrossedInCurrRound += 1;
    roomtemp.num_crossed_curr_round += 1;

    console.log("Player crossed: " + roomtemp.num_crossed_curr_round);

    if (room.numCrossedInCurrRound !== room.players.length) {
      room.numberCrossedStatus.forEach((player) => {
        if (player.id === socket.id) {
          player.isCrossed = true;
        }
      });
    }

    if (roomtemp.num_crossed_curr_round !== roomtemp.players.length) {
      roomtemp.players.forEach((player) => {
        if (player.id === socket.id) {
          player.is_crossed = true;
        }
      });
      await roomtemp.save();
      io.to(String(roomid)).emit("players crossed", roomtemp.players);
      return callback({ status: true });
    }

    roomtemp.num_crossed_curr_round = 0;
    room.numCrossedInCurrRound = 0;
    room.roundNumber += 1;

    room.numberCrossedStatus.forEach((player) => (player.isCrossed = false));
    roomtemp.players.forEach((player) => (player.is_crossed = false));

    io.to(String(roomid)).emit("players crossed", roomtemp.players);

    room.currTurn = (room.currTurn + 1) % room.players.length;
    roomtemp.curr_player_idx = (roomtemp.curr_player_idx + 1) % roomtemp.players.length;

    roomtemp.curr_turn = roomtemp.players[roomtemp.curr_player_idx];
    room.currRound = {
      id: room.players[room.currTurn].id,
      name: room.players[room.currTurn].name,
      choosen_number: -1,
    };

    await roomtemp.save();
    io.to(String(roomid)).emit("player turn", { player_turn: roomtemp.curr_turn });
    
  });

  socket.on("set choosen number", async ({ roomid, box_num }, callback) => {
    console.log("Received chosen number: " + roomid + " " + box_num);

    const roomtemp = await Room.findOneAndUpdate(
      { room_id: roomid },
      { $push: { all_crossed_number: box_num } },
      { new: true }
    );

    if (!roomtemp) return callback({ status: false, msg: "Room not found in DB" });

    const room = roomData.get(String(roomid));
    if (!room) return callback({ status: false, msg: "Game is over already" });

    room.allCrossedNumber.push(box_num);
    io.to(String(roomid)).emit("number choosen", box_num);
  });
};

export default crossNumber;