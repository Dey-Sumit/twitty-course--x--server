import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { connectDB } from "@utils/db";
import { errorHandler, notFound } from "@middlewares/error.middleware";
import authRoutes from "@routes/auth.routes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // pares json data
app.use(express.urlencoded({ extended: true })); // parse the url encoded bodies, extended:true, the data type can be any

// demo
/* app.get("/auth", (req, res) => {
  throw Error("new error");
}); */

// api routes
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is Running on ${PORT}`);
});
