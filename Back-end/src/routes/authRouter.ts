import express, { Router } from "express";
import authController from "../controllers/auth.controller";

import {
  validateRegister,
  validateMail,
} from "../middlewares/validations/register-request";

const authRouter: Router = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", validateRegister, authController.register);

authRouter.get("/validate", authController.validate);
authRouter.get("/logout", authController.logout);
authRouter.get("/profile", authController.getProfile);
authRouter.get("/update", authController.updateUsername);

authRouter.post("/checkEmail", validateMail, authController.checkEmail);

export default authRouter;
