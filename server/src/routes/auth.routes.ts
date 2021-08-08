import { login, logout, signup } from "@controllers/auth.controller";
import { signupValidator } from "@middlewares/validator.middleware";
import express from "express";

const router = express.Router();

// TODO add validator
router.post("/signup", signupValidator, signup);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
