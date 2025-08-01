import express from "express";
import {
  signupUser,
  loginUser,
  getUser,
} from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/getuser", verifyUser, getUser);
router.post("/login", loginUser);
router.post("/signup", upload.single("profilePicture"), signupUser);

export default router;
