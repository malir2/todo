import mongoose from "mongoose";

const Database_Connection = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error + " Failed to connect database");
  }
};

export default Database_Connection;
