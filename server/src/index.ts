import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { connectDB } from "@utils/db";
import { errorHandler, notFound } from "@middlewares/error.middleware";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("dev"));

// demo
app.get("/auth", (req, res) => {
  throw Error("new error");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is Running on ${PORT}`);
});
