import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import EmailValidator from "email-validator";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    return accessToken;
  } catch (error) {
    console.error(error);
  }
};

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || username.length < 6) {
      throw new ApiError(
        400,
        "Enter a valid Username containing minimum 6 letters"
      );
    }

    if (!password || password.length < 6) {
      throw new ApiError(
        400,
        "Provide a valid Password containing minimum 6 letters"
      );
    }

    let emailVerified = EmailValidator.validate(email);
    if (!emailVerified) {
      throw new ApiError(400, "Provide a proper email adress");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new ApiError(400, "User already exists please Login");
    }

    const usernameTaken = await User.findOne({ username });
    if (usernameTaken) {
      throw new ApiError(
        400,
        "User with this username already exists please choose another username"
      );
    }

    const profilePicLocalPath = req.file?.path;
    if (!profilePicLocalPath) {
      throw new ApiError(400, "Profile Pic required");
    }

    const uploadedProfilePicture = await uploadOnCloudinary(
      profilePicLocalPath
    );

    await User.create({
      username,
      email,
      password,
      profilePicture: uploadedProfilePicture.url,
    });
    const createdUser = await User.findOne({ username }).select("-password");

    res
      .status(200)
      .json(new ApiResponse(200, createdUser, "Signup sucessfull"));
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Password Incorrect");
    }

    const accessToken = await generateAccessToken(user._id);
    const loggesInUser = await User.findById(user._id).select("-password");

    const options = {
      htmlOnly: false,
      secure: false,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, loggesInUser, "Login sucessfull"));
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).json({ error });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const userInfo = await User.findById(userId);
    res.status(200).json(new ApiResponse(200, userInfo, "Got user data"));
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode)
      .json(new ApiError(500, "Some error occured in getUser controller"));
  }
};

export { signupUser, loginUser, getUser };
