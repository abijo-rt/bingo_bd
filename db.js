import mongoose from "mongoose";


mongoose.connect('mongodb://localhost:27017/bingo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
        .then(()=> console.log("Connected to MongoDB"))
        .catch(err=>console.log("ERROR IN CONNCECTING MONGO DB" + err));


const roomData = new Map();

export default roomData;