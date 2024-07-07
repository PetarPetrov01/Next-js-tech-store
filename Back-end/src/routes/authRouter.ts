import express, { Router } from "express";
import authController from "../controllers/auth.controller";

const authRouter: Router = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;
