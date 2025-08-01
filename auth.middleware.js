import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import User from "../model/user.model.js";

const verifyUser = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(401, "Unauthorised request");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );

    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("some error in verify user function", error);
  }
};

export { verifyUser };
