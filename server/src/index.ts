import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "@utils/db";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("dev"));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is Running on ${PORT}`);
});
