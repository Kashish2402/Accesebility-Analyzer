import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

// FUNCTION TO GENERATE AUTHENTICATION TOKEN
const generateAccessTokenAndRefreshToken = async (userId, next) => {
  if (!userId) return next(new ApiError("INVALID TOKEN ERROR"));

  const user = await User.findById(userId).select("-password");
  if (!user) return next(new ApiError("INVALID TOKEN ERROR"));

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

// FUNCTION TO CREATE USER
const signUp = asyncHandler(async (req, res, next) => {
  const { fullName, username, email, password, gender, dob } = req.body;

  if (!fullName || !username || !email || !password || !gender || !dob) {
    return next(new ApiError(401, "Please fill all he fields."));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new ApiError(402, "User already exists..."));

  const user = await User.create({
    fullName,
    username,
    email,
    password,
    gender,
    dob,
  });

  if (!user)
    return next(new ApiError(404, "Something went wrong... User not created."));

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id, next);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { userDetails: user, accessToken, refreshToken },
        "Sign in successful"
      )
    );
});

// LOGIN FUNCTION
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ApiError(404, "User not found..."));

  const checkPassword = await user.validatePassword(password);

  if (!checkPassword) return next(new ApiError(404, "Invalid password..."));

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id, next);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { userDetails: user, accessToken, refreshToken },
        "Sign in successful"
      )
    );
});

// FUNCTION TO CHANGE PASSWORD
const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!req.user?._id) return next(new ApiError(401, "UNAUTHORISED REQUEST"));

  if (!oldPassword || !newPassword || !confirmNewPassword)
    return next(new ApiError(400, "Please fill all fields"));

  const user = await User.findById(req.user._id);
  if (!user) return next(new ApiError(404, "User not found..."));

  if (newPassword !== confirmNewPassword)
    return next(
      new ApiError(404, "New Password and confirm new password must be same...")
    );

  const checkPass = await user.validatePassword(oldPassword);
  if (!checkPass) return next(new ApiError(404, "Invalid old password..."));

  user.password = newPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, [], "Password updated Successfully..."));
});

// FUNCTION TO GET USER DETAILS
const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user?._id)
    .lean()
    .select("-password -refreshToken");
  if (!user) return next(new ApiError(404, "User not found..."));
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Details fetched Successfully.."));
});

// FUNCTION TO FETCH USER
const fetchUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .lean()
    .select("-password -refreshToken");
  if (!user) return next(new ApiError(404, "User not found..."));
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Fetched Successsfully..."));
});

// FUNCTION TO UPDATE PROFILE PICTURE
const updateProfilePicture = asyncHandler(async (req, res, next) => {
  const file = req.file?.path;

  if (!file) return next(new ApiError(404, "Please select a file..."));

  const fileUpload = await uploadOnCloudinary(file);
  if (!fileUpload) return next(new ApiError(404, "Unable to upload file..."));

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { profilePicture: fileUpload.secure_url },
    },
    { new: true }
  );

  if (!user)
    return next(new ApiError(404, "Unable to update profile picture..."));

  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Profile picture updated Successfully...")
    );
});

const logout = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { refreshToken: null },
    { new: true }
  );
  if (!user) return next(new ApiError(404, "Unable to logout..."));
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "Logged out successfully."));
});

const guestLogin = asyncHandler(async (req, res, next) => {
  let guest = await User.findOne({ email: "guest@gmail.com" });

  if (!guest) {
    guest = await User.create({
      fullName: "Guest User",
      username: "guestuser",
      email: "guest@gmail.com",// this will be hashed via your model
      role: "guest", 
    });
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(guest._id, next);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { userDetails: guest, accessToken, refreshToken },
        "Guest logged in successfully"
      )
    );
});


export {
  signUp,
  login,
  changePassword,
  fetchUser,
  getUserDetails,
  updateProfilePicture,
  logout,
  guestLogin,
};
