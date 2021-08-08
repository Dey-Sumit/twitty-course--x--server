import { deleteUserById, getUserById, updateUserById } from "@controllers/users.controller";
import authMiddleware from "@middlewares/auth.middleware";

import express from "express";

const router = express.Router();

router
  .route("/:id")
  .get(getUserById)
  // .put( uploadFile().single("profilePicture"), updateUserById)
  .delete(authMiddleware, deleteUserById);

export default router;
