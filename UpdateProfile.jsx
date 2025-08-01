import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

function UpdateProfile() {
  const [newProfilePicture, setNewProfilePicture] = useState("");
  const handleProfileChange = (e) => {
    // console.log(newProfilePicture);
    e.preventDefault();
    axios
      .post(
        "/api/v1/users/updateprofilepic",
        { newProfilePicture },
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
        console.error(error.response.data.message);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div>
      <p>Change Profile Picture</p>
      <input
        type="file"
        onChange={(e) => {
          setNewProfilePicture(e.target.files[0]);
        }}
      />
      <button
        className="h-6 rounded-xl px-4 bg-orange-500"
        onClick={handleProfileChange}
      >
        Change Profile
      </button>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default UpdateProfile;
