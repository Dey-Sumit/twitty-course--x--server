import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { connectDB } from "@utils/db";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("dev"));

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is Running on ${PORT}`);
});
