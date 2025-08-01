import React, { useContext, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { ThemeContext } from "../contexts/ThemeContext";

function UpdateUsername() {
  const [newUsername, setNewUsername] = useState("");
  const { theme } = useContext(ThemeContext);
  const handleUsernameChangeBtn = (e) => {
    console.log(newUsername);
    e.preventDefault();
    axios
      .post(
        "/api/v1/users/changeusername",
        { newUsername },
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="my-4">
      <p>Change Username</p>
      <input
        className={
          theme === "dark"
            ? "bg-gray-700 h-6 rounded-xl px-4"
            : "h-6 rounded-xl px-4 border border-black"
        }
        type="text"
        value={newUsername}
        placeholder="Enter New Username"
        onChange={(e) => {
          setNewUsername(e.target.value);
        }}
      />
      <button
        className="h-6 rounded-xl px-4 bg-orange-500"
        onClick={handleUsernameChangeBtn}
      >
        Update Username
      </button>
    </div>
  );
}

export default UpdateUsername;
