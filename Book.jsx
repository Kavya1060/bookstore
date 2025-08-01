import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { BookContext } from "../contexts/BookContext";

function Book(props) {
  const { theme } = useContext(ThemeContext);
  const { allBooks, setAllBooks } = useContext(BookContext);

  const likeBookBtnFunction = () => {
    axios
      .post(
        `/api/v1/books/likebook/${props.book._id}`,
        {},
        {
          withCredentials: true,
          credentials: "include",
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.error) {
          toast.error(res.data.error.message);
          console.log(res.data.error.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.error.message);
      });
  };

  const disLikeBookBtnFunction = () => {
    // console.log(props.book._id);
    axios
      .post(
        `/api/v1/books/dislikebook/${props.book._id}`,
        {},
        {
          withCredentials: true,
          credentials: "include",
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
        if (res.data.error) {
          toast.error(res.data.error.message);
          console.log(res.data.error.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.error.message);
      });
  };

  const markAsReadBtnFunction = () => {
    try {
      axios
        .post(
          `/api/v1/books/markasread/${props.book._id}`,
          {},
          {
            withCredentials: true,
            credentials: "include",
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.error.message);
            console.log(res.data.error.message);
          } else {
            toast.success(res.data.message);
          }
        });
    } catch (error) {
      console.log(error);
      toast.error(error.error.message);
    }
  };
  return (
    <div
      key={props.book.title}
      className={
        theme === "dark"
          ? "h-80 bg-gray-500 m-5 p-2 w-80 rounded-xl flex justify-center items-center  gap-4"
          : "h-80 bg-gray-200 m-5 p-2 w-80 flex rounded-xl justify-center items-center  gap-4"
      }
    >
      <div className="w-1/3 flex justify-center items-center">
        <img
          src={
            props.book.cover === ""
              ? "../../public/download.jpg"
              : props.book.cover
          }
          className="h-full"
          alt="Book Cover"
        />
      </div>
      <div className="w-2/3">
        <h2 className="font-bold text-xl"> {props.book.title}</h2>
        <h3>Author - {props.book.author}</h3>
        <div>
          <p>Likes - {props.book.likes}</p>
          <button
            onClick={likeBookBtnFunction}
            className={
              theme === "dark"
                ? "rounded-xl h-8 px-1 w-18 bg-gray-700"
                : "rounded-xl h-8 px-1 w-18 bg-gray-100"
            }
          >
            Like 👍
          </button>
        </div>
        <div>
          <p>Dislikes - {props.book.disLikes}</p>
          <button
            onClick={disLikeBookBtnFunction}
            className={
              theme === "dark"
                ? "rounded-xl h-8 px-1 w-18 bg-gray-700"
                : "rounded-xl h-8 px-1 w-18 bg-gray-100"
            }
          >
            Dislike 👎
          </button>
        </div>
        <div>
          <p>Read By - {props.book.readBy}</p>
          <button
            onClick={markAsReadBtnFunction}
            className={
              theme === "dark"
                ? "rounded-xl h-8 px-1 w-18 bg-gray-700"
                : "rounded-xl h-8 px-1 w-18 bg-gray-100"
            }
          >
            Mark as Read
          </button>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default Book;
