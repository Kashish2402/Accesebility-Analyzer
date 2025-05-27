import { analyzeURL } from "../utils/analyze.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"

const analyzeUrl = asyncHandler(async (req, res, next) => {
  const { url } = req.body;
 
    const results = await analyzeURL(url);

    if(!results) return next(new ApiError(400,"Unable to fetch result"))
    return res
      .status(200)
      .json(new ApiResponse(200, results, "Url Analyzed Successfully"));
  
});

export {analyzeUrl}