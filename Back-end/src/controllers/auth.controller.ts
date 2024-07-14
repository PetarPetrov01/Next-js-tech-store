import { Request, Response } from "express";
import authService from "../services/authService";

async function login(req: Request, res: Response) {
  try {
    const {email, password} = req.body;
    const result = await authService.login(email, password);
    
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

async function register(req: Request, res: Response) {
  console.log(req.body);
  res.status(200).json({ message: "Register request" });
}

const authController = { login, register };

export default authController;
