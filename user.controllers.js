import User from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUserData = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(401, "Please Provide a id");
    }

    const userData = await User.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "readBy",
          foreignField: "_id",
          as: "readBy",
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "likedBooks",
          foreignField: "_id",
          as: "likedBooks",
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "disLikedBooks",
          foreignField: "_id",
          as: "disLikedBooks",
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "toRead",
          foreignField: "_id",
          as: "toRead",
        },
      },
    ]);
    if (!userData) {
      res.status(404).json(new ApiError(404, "User data not found"));
    }

    res.status(200).json(new ApiResponse(200, userData, "Got user Data"));
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode)
      .json(
        new ApiError(500, "Some error occured in user getUserData controller")
      );
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User Not Found");
    }

    const { oldPassword, newPassword } = req.body;
    console.log({ oldPassword, newPassword });
    if (!oldPassword || !newPassword) {
      throw new ApiError(400, "All fields are required");
    }
    if (oldPassword === newPassword) {
      throw new ApiError(400, "Old and new passwords are same");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Incorrect Password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed sucessfully"));
  } catch (error) {
    console.error(error);
    res.status(error.statusCode).json({ error });
  }
};

const changeUsername = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { newUsername } = req.body;
    if (!newUsername) {
      throw new ApiError(400, "New username required");
    }

    user.username = newUsername;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { "New Username": newUsername },
          "Username changed"
        )
      );
  } catch (error) {
    console.error(error);
    res.status(error.statusCode).json({ error });
  }
};

const updateProfilePhoto = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(req.files);
    const avatarLocalPath = req.file.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Please provide a avatar");
    }

    const newProfilePicture = await uploadOnCloudinary(avatarLocalPath);
    if (!newProfilePicture) {
      throw new ApiError(
        500,
        "Some error occured in the uploading of new profile pricture"
      );
    }

    user.profilePicture = newProfilePicture.url;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Profile Picture changed sucessfully"));
  } catch (error) {
    console.error(error);
    res.status(error.statusCode).json({ error });
  }
};

export { getUserData, changePassword, updateProfilePhoto, changeUsername };
