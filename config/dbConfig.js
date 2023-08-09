const mongoose = require("mongoose");


const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI)
        //console.log("MongoDB connected at " + conn.connection.host) (one way)
        console.log(`MongoDB connected at: ${conn.connection.host}`); //(the other way)
    }catch(error){
        console.log(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
}


module.exports = connectDB;