import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {
  getUserData,
  changePassword,
  changeUsername,
  updateProfilePhoto,
  // likeBook,
} from "../controllers/user.controllers.js";

const router = express.Router();

// router.post("like/:id", verifyUser, likeBook);
router.get("/getuser", verifyUser, getUserData);
router.post("/changeusername", verifyUser, changeUsername);
router.post("/changepassword", verifyUser, changePassword);
router.post(
  "/updateprofilepic",
  verifyUser,
  upload.single("newProfilePicture"),
  updateProfilePhoto
);

export default router;
