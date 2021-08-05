import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  const connection = mongoose.connection;

  connection.on("error", (error) => console.log(`-> DB Connection error : ${error.message} `));

  connection.on("connected", () => console.log("-> Connected to DataBase"));

  if (connection.readyState >= 1) {
    console.log("Connected to DataBase");
    return;
  }
};
