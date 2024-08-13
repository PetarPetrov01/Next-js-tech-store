import express, { Router } from "express";
import authController from "../controllers/auth.controller";

import validateRegister from "../middlewares/validations/register-request";

const authRouter: Router = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", validateRegister,authController.register);
authRouter.get("/profile", authController.getProfile);
authRouter.get("/update", authController.updateUsername);

export default authRouter;
