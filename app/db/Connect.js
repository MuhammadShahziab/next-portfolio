import mongoose from "mongoose";

let isConnected = false;

const ConnectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already Connected");
  }

  try {
    mongoose.connect(process.env.MONGO_URL);

    isConnected = true;

    console.log("MongoDB is connected!");
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
