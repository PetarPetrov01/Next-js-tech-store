import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  console.log(req.body);
  res.status(200).json({message: 'Login request'})
}

export async function register(req: Request, res: Response) {
    console.log(req.body);
    res.status(200).json({message: 'Register request'})
  }
