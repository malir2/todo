import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
