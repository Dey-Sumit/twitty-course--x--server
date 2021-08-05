import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { connectDB } from "@utils/db";
import { errorHandler, notFound } from "@middlewares/error.middleware";
import authRoutes from "@routes/auth.routes";
import sessionMiddleware from "@middlewares/session.middleware";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // pares json data
app.use(express.urlencoded({ extended: true })); // parse the url encoded bodies, extended:true, the data type can be any

app.use(sessionMiddleware);

// demo
app.get("/api/demo", (req, res) => {
  console.log(req.session);
  //   console.log(req.sessionID);
  return res.json({ sessionID: req.sessionID });
});

// api routes
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is Running on ${PORT}`);
});
