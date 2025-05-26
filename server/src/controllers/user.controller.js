import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// FUNCTION TO GENERATE AUTHENTICATION TOKEN
const generateAccessTokenAndRefreshToken = async (userId) => {
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

  if (!fullName && !username && !email && !password && !gender && !dob) {
    return next(new ApiError(401, "Please fill all he fields."));
  }

  const existingUser = await User.find({ email });
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
    await generateAccessTokenAndRefreshToken();

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
        { authuser: user, accessToken, refreshToken },
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
    await generateAccessTokenAndRefreshToken();

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
        { authuser: user, accessToken, refreshToken },
        "Sign in successful"
      )
    );
});

// FUNCTION TO CHANGE PASSWORD
const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  if (!req.user?._id) return next(new ApiError(401, "UNAUTHORISED REQUEST"));

  if (!oldPassword && !newPassword && !confirmNewPassword)
    return next(new ApiError(400, "Please fill all fields"));

  const user = await User.findById(req.user._id);
  if (!user) return next(new ApiError(404, "User not found..."));

  if (newPassword !== confirmNewPassword)
    return next(
      new ApiError(404, "New Password and confirm new password must be same...")
    );

  const checkPass = await user.validatePassword(oldPassword);
  if (!checkPass) return next(new ApiError(404, "Invalid old password..."));

  const updatePassword = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { password: newPassword } },
    { new: true }
  );
  if (!updatePassword)
    return next(new ApiError(404, "Unable to update password.."));

  return res.status(200).json(200, [], "Password updated Successfully...");
});

// FUNCTION TO GET USER DETAILS
const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  if (!user) return next(new ApiError(404, "User not found..."));
  return res.status(200).json(user);
});

// FUNCTION TO FETCH USER
const fetchUser = asyncHandler(async (req, res, next) =>{
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) return next(new ApiError(404, "User not found..."))
    return res.status(200).json(new ApiResponse(200,user,"User Fetched Successsfully..."))
})

// FUNCTION TO UPDATE PROFILE PICTURE
const updateProfilePicture=asyncHandler((req,res,next)=>{
    
})


export { signUp, login, changePassword,fetchUser,getUserDetails };
