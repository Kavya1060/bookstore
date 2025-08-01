import mongoose, { Schema } from "mongoose";
import Book from "./books.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 6,
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    likedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: Book,
      },
    ],
    disLikedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: Book,
      },
    ],
    toRead: [
      {
        type: Schema.Types.ObjectId,
        ref: Book,
      },
    ],
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_PRIVATE_KEY,
    { expiresIn: "10d" }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
