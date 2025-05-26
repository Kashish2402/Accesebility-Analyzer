import { User } from "../models/user.model";
import {jwt} from "jsonwebtoken"
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      return next(new ApiError(401, "UNAUTHORISED ACCESS - NO TOKEN PROVIDED"));

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken)?.select(
      "-password -refreshToken"
    );

    if (!user) return next(new ApiError(401, "NO ACCESS TOKEN"));

    req.user = user;

    next();
  } catch (error) {
    return next(new ApiError(404, error.message || "NO ACCESS TOKEN FOUND"));
  }
});
