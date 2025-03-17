
const generateRoomId = () =>
{
    const str = "ABCDEFGHIJKLMNOPQURSTUVWXYZ1234567890"
    let roomId = "";
    for( let i=0 ; i<5 ; i++ ){
        roomId += str.charAt(Math.random()*36);
    }

    return roomId;
}

export default generateRoomId;