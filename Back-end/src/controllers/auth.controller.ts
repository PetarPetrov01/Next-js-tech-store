import { Request, Response } from "express";
import authService from "../services/authService";

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { authToken, user } = await authService.login(email, password);

    res.cookie("authToken", authToken, {
      domain: "localhost",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(401).json({message: error.message});
  }
}

async function register(req: Request, res: Response) {
  console.log(req.body);
  res.status(200).json({ message: "Register request" });
}

const authController = { login, register };

export default authController;
