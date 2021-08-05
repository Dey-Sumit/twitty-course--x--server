import { login, logout, signup } from "@controllers/auth.controller";
import express from "express";

const router = express.Router();

// TODO add validator
router.post("/signup", signup);
router.post("/login", login);
router.delete("/logout", logout);

export default router;
