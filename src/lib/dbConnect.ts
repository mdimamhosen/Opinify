import mongoose from "mongoose";

 type ConnectionObject ={
    isConnected?: number
 }

 const connection: ConnectionObject={
 };

 async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log("Using existing connection");
          return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI || "", {

        })
        connection.isConnected = mongoose.connections[0].readyState;
        console.log("New connection created");
    } catch (error) {
        console.log ("Error in dbConnect",error);
        process.exit(1);
    }
 }
export default dbConnect;
