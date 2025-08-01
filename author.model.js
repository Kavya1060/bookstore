import mongoose, { Schema } from "mongoose";
import Book from "./books.model";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    allBooks: [{ type: Schema.Types.ObjectId, ref: Book }],
    authorRating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);

export default Author;
