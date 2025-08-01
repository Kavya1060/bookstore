import React, { useContext, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { ThemeContext } from "../contexts/ThemeContext";

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { theme } = useContext(ThemeContext);
  const handlePasswordChangeBtn = (e) => {
    console.log({ oldPassword, newPassword });
    e.preventDefault();
    axios
      .post(
        "/api/v1/users/changepassword",
        { oldPassword, newPassword },
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
        console.error(error.response.data.error.message);
        toast.error(error.response.data.error.message);
      });
  };
  return (
    <div>
      <p>Change Password</p>
      <input
        className={
          theme === "dark"
            ? "bg-gray-700 h-6 rounded-xl px-4"
            : "h-6 rounded-xl px-4 border border-black"
        }
        type="text"
        placeholder="Enter Old Password"
        value={oldPassword}
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
      />
      <input
        className={
          theme === "dark"
            ? "bg-gray-700 h-6 rounded-xl px-4"
            : "h-6 rounded-xl px-4 border border-black"
        }
        type="text"
        placeholder="Enter New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
      />
      <button
        className="h-6 rounded-xl px-4 bg-orange-500"
        onClick={handlePasswordChangeBtn}
      >
        Update Password
      </button>
    </div>
  );
}

export default UpdatePassword;
