import { userService } from "../service/index.js";
import catchAsync from "../utils/catchAsync.js";

export const registerUser = catchAsync(async (req, res) => {
  const result = await userService.registerUser(req.body);
  return res.status(201).json(result);
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await userService.loginUser(email, password);
  return res.status(200).json(result);
});

export const getAllUser = catchAsync(async (req, res) => {
  const { page, limit, searchQuery } = req.query;
  const userId=req.userId;
  const result = await userService.getAllUsers(page, limit, searchQuery,userId);
  return res.status(200).json(result);
})