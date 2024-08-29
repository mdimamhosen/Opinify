import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Using existing connection");
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://imam:aaadsr191@cluster0.wahes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ||
        "",
      {}
    );
    connection.isConnected = mongoose.connections[0].readyState;
    console.log("New connection created");
  } catch (error) {
    console.log("Error in dbConnect", error);
    process.exit(1);
  }
}
export default dbConnect;
