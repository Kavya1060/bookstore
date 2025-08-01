import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import UpdateProfile from "../components/UpdateProfile";
import UpdateUsername from "../components/UpdateUsername";
import UpdatePassword from "../components/UpdatePassword";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import AddBooks from "../components/AddBooks";

function Profile() {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return null;
  const [data, setData] = useState({
    username: "",
    email: "",
    profileUrl: "",
    likedBooks: [],
    disLikedBooks: [],
    toRead: [],
  });
  useEffect(() => {
    axios
      .get("/api/v1/users/getuser", {
        withCredentials: true,
      })
      .then((response) => {
        setData({
          username: response.data.data[0].username,
          email: response.data.data[0].email,
          profileUrl: response.data.data[0].profilePicture,
          likedBooks: response.data.data[0].likedBooks,
          disLikedBooks: response.data.data[0].disLikedBooks,
          toRead: response.data.data[0].toRead,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setData]);
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <Navbar />
      <div
        className={
          theme == "dark"
            ? "min-h-screen bg-gray-950 text-white flex justify-center py-10"
            : "min-h-screen flex justify-center py-10"
        }
      >
        <div
          className={
            theme == "dark"
              ? "bg-gray-950s flex flex-col items-end px-10 w-1/2  text-white"
              : "flex flex-col items-end px-10 w-1/2 "
          }
        >
          <img
            src={data.profileUrl || "../../black-pfp-5.jpg"}
            className="w-80 h-80 rounded-full"
            alt="Profile Picture"
          />
          <UpdateProfile />
        </div>
        <div
          className={theme == "dark" ? "bg-gray-950 w-1/2 text-white" : "w-1/2"}
        >
          <div>
            <h1 className="font-bold my-4 text-3xl">
              Username - {data.username}
            </h1>
            <p className="my-4 text-3xl">Email - {data.email}</p>
            <div className="my-4">
              <UpdateUsername />
              <UpdatePassword />
            </div>
            <div>
              <BookList title={"Liked Books"} books={data.likedBooks} />
              <BookList title={"Disiked Books"} books={data.disLikedBooks} />
              <BookList title={"Read Books"} books={data.toRead} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          theme === "dark"
            ? "bg-gray-950 m-0 py-2 text-white text-center"
            : "text-center m-0 py-2"
        }
      >
        <h1 className="font-bold my-4 text-3xl">Add Books</h1>
        <h1 className="font-bold my-4 text-3xl">↓</h1>
      </div>
      <div className="h-80">
        <AddBooks />
      </div>
    </div>
  );
}

export default Profile;
