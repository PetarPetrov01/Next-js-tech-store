import { NextFunction, Response } from "express";
import { CustomRequest } from "./sesssion";

export function isUser() {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user) {
      next();
    } else {
      res.status(403).json({ message: "You must be logged in" });
    }
  };
}

export function isGuest(){
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if(req.user){
      res.status(403).json({ message: "You are already logged in" });
    } else {
      next()
    }
  }
}

