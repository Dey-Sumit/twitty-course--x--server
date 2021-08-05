import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
