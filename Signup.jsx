import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { ThemeContext } from "../contexts/ThemeContext";

function Signup() {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, username, password } = data;
    if (password.length < 8) {
      toast.error("Password should be greater than 8 letters");
    } else {
      axios
        .post(
          "/api/v1/auth/signup",
          { email, username, password, profilePicture },
          {
            withCredentials: true,
            credentials: "include",
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((res) => {
          console.log(res);
          // toast.success(res.data.message);
        })
        .catch((error) => {
          // console.log(error);
          console.error(error);
          // toast.error(error.response.data.error.message);
        });
    }
  };
  return (
    <div
      className={
        theme == "dark" ? "bg-gray-950 h-screen text-white" : "bg-white"
      }
    >
      <Navbar />
      <form className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <input
          className={
            theme === "dark"
              ? "bg-gray-700 h-6 rounded-xl px-4"
              : "h-6 rounded-xl px-4 border border-black"
          }
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          className={
            theme === "dark"
              ? "bg-gray-700 h-6 rounded-xl px-4"
              : "h-6 rounded-xl px-4 border border-black"
          }
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
        <input
          className={
            theme === "dark"
              ? "bg-gray-700 h-6 rounded-xl px-4"
              : "h-6 rounded-xl px-4 border border-black"
          }
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <input
          type="file"
          className="w-55"
          onChange={(e) => {
            setProfilePicture(e.target.files[0]);
          }}
        />
        <button
          className="h-6 rounded-xl px-4 bg-orange-500"
          onClick={handleSignUp}
        >
          Signup
        </button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default Signup;
