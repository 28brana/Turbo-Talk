import { Router } from "express";
import { userController } from "../controller/index.js";

const userRouter = Router();

userRouter.post("/login", userController.loginUser);
userRouter.post("/register", userController.registerUser);
userRouter.get('/',userController.getAllUser);
export default userRouter;