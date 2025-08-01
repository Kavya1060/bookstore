import express from "express";
import {
  getAllBooks,
  addBook,
  likeBook,
  disLikeBooks,
  markAsRead,
  searchBook,
} from "../controllers/books.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/allbooks", getAllBooks);
router.post("/search", searchBook);
router.post("/addbook", upload.single("bookCover"), addBook);
router.post("/likebook/:id", verifyUser, likeBook);
router.post("/dislikebook/:id", verifyUser, disLikeBooks);
router.post("/markasread/:id", verifyUser, markAsRead);

export default router;
