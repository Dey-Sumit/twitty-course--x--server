import {
  deleteUserById,
  getUserById,
  searchUser,
  updateUserById,
} from "@controllers/users.controller";
import authMiddleware from "@middlewares/auth.middleware";
import uploadFile from "@middlewares/upload.middleware";

import express from "express";

const router = express.Router();

router.get("/search", searchUser); // should be at the top

router
  .route("/:id")
  .get(getUserById)
  .put(uploadFile().single("profilePicture"), updateUserById)
  .delete(authMiddleware, deleteUserById);

export default router;
