import { Request, Response } from "express";

async function login(req: Request, res: Response) {
  console.log(req.body);
  res.status(200).json({ message: "Login request" });
}

async function register(req: Request, res: Response) {
  console.log(req.body);
  res.status(200).json({ message: "Register request" });
}

const authController = { login, register };

export default authController;
