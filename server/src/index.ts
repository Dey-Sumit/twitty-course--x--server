import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import { connectDB } from "@utils/db";
import { errorHandler, notFound } from "@middlewares/error.middleware";
import authRoutes from "@routes/auth.routes";
import sessionMiddleware from "@middlewares/session.middleware";
import passport from "@middlewares/passport.middleware";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // pares json data
app.use(express.urlencoded({ extended: true })); // parse the url encoded bodies, extended:true, the data type can be any

// auth & session middlewares
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

// api routes
app.use("/api/auth", authRoutes);

// demo
app.get("/api/demo", (req, res) => {
  console.log(req.session, req.user, req.isAuthenticated());
  //   console.log(req.sessionID);
  return res.json({ sessionID: req.sessionID });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is Running on ${PORT}`);
});
