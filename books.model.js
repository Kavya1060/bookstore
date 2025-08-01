import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    author: {
      type: String,
      required: true,
      default: "Unknown",
    },
    cover: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    disLikes: {
      type: Number,
      default: 0,
    },
    readBy: {
      type: Number,
      default: 0,
    },
    bookRating: {
      type: Number,
      default: 0,
      enum: [0, 1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
