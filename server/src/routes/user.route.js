import { Router } from "express";
import { userController } from "../controller/index.js";
import validate from "../middleware/validate.js";
import { userValidate } from "../validation/index.js";

const userRouter = Router();

userRouter.post("/login", validate(userValidate.login),userController.loginUser);
userRouter.post("/register",validate(userValidate.register), userController.registerUser);
userRouter.get('/',userController.getAllUser);
export default userRouter;