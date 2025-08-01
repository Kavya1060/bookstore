import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    axios
      .get("/api/v1/auth/getuser", {
        withCredentials: true,
      })
      .then((response) => {
        setProfileUrl(response?.data?.data?.profilePicture);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setIsAuthenticated, setTheme]);

  const handelLogoutBtnClick = () => {
    setIsAuthenticated(false);
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const handelLoginBtnClick = () => {
    navigate("/login");
  };

  const handelSignupBtnClick = () => {
    navigate("/signup");
  };

  const handleSearchBtnClick = () => {
    setTitle(title.toLowerCase());
    axios
      .post("/api/v1/books/search", {
        title,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((error) => console.error(error));
  };

  const themeChangeBtnClickFunction = () => {
    if (theme == "dark") {
      setTheme("light");
      toast.success("Theme changed to Light");
    } else {
      setTheme("dark");
      toast.success("Theme changed to Dark");
    }
  };

  const handleProfileBtnClick = (e) => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  };

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-950 text-white flex justify-around items-center h-20"
          : "bg-white text-black flex justify-around items-center h-20"
      }
    >
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <h1 className="font-extrabold cursor-pointer text-2xl">BookStore</h1>
      </div>

      <div className="flex justify-center items-center gap-2">
        <input
          className={
            theme === "dark"
              ? "h-10 w-60 border border-orange-500 rounded-lg p-4 bg-gray-950 text-white"
              : "h-10 w-60 border border-orange-500 rounded-lg p-4"
          }
          type="text"
          placeholder="Search Books"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button
          onClick={handleSearchBtnClick}
          className="h-10 bg-orange-500 w-10 rounded-xl"
        >
          🔍
        </button>
      </div>
      <div className="flex justify-between items-center gap-4">
        <div onClick={handleProfileBtnClick}>
          <img
            className="h-16 w-16 rounded-full"
            src={isAuthenticated ? profileUrl : "../../black-pfp-5.jpg"}
            alt="Profile Picture"
          />
        </div>
        {isAuthenticated ? null : (
          <button
            className={
              theme == "dark"
                ? "bg-orange-500 rounded-lg px-2"
                : "bg-orange-500 rounded-lg px-2"
            }
            onClick={handelSignupBtnClick}
          >
            Signup
          </button>
        )}
        <button
          className={
            theme == "dark"
              ? " bg-orange-500 rounded-lg px-2"
              : " bg-orange-500 rounded-lg px-2"
          }
          onClick={isAuthenticated ? handelLogoutBtnClick : handelLoginBtnClick}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
      <div>
        <button
          className={
            theme == "dark"
              ? " bg-orange-500 rounded-lg px-2"
              : " bg-orange-500 rounded-lg px-2"
          }
          onClick={themeChangeBtnClickFunction}
        >
          {theme == "dark" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
      <Toaster position="botton-right" />
    </div>
  );
}

export default Navbar;
