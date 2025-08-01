import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";

function AddBooks() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState({
    bookTitle: "",
    author: "",
    bookRating: 0,
    bookCover: "",
  });

  const handleAddBookBtnClick = async () => {
    const { bookTitle, author, bookRating, bookCover } = data;
    axios
      .post(
        "/api/v1/books/addbook",
        { bookTitle, author, bookCover, bookRating },
        {
          withCredentials: true,
          credentials: "include",
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        toast.error(error.response.data.error.message);
      });
  };
  return (
    <>
      <div
        className={
          theme === "dark"
            ? "h-screen w-screen flex flex-col bg-gray-950 text-white gap-2 justify-center items-center"
            : "h-screen w-screen flex flex-col gap-2 justify-center items-center"
        }
      >
        <input
          className={
            theme === "dark"
              ? "bg-gray-700 h-6 rounded-xl px-4"
              : "h-6 rounded-xl px-4 border border-black"
          }
          value={data.bookTitle}
          onChange={(e) => {
            setData({ ...data, bookTitle: e.target.value });
          }}
          type="text"
          placeholder="Book Title"
        />
        <input
          className={
            theme === "dark"
              ? "bg-gray-700 h-6 rounded-xl px-4"
              : "h-6 rounded-xl px-4 border border-black"
          }
          value={data.author}
          onChange={(e) => {
            setData({ ...data, author: e.target.value });
          }}
          type="text"
          placeholder="Author"
        />
        <input
          className={
            theme === "dark"
              ? "bg-gray-700 h-6 rounded-xl px-4"
              : "h-6 rounded-xl px-4 border border-black"
          }
          value={data.bookRating}
          onChange={(e) => {
            setData({ ...data, bookRating: e.target.value });
          }}
          type="text"
          placeholder="Rating ⭐️"
        />
        <input
          type="file"
          className="w-52"
          onChange={(e) => {
            setData({ ...data, bookCover: e.target.files[0] });
          }}
          placeholder="Rating ⭐️"
        />
        <button
          onClick={handleAddBookBtnClick}
          className="h-6 rounded-xl px-4 bg-orange-500"
        >
          Add Book
        </button>
      </div>
      <Toaster position="botton-right" />
    </>
  );
}

export default AddBooks;
