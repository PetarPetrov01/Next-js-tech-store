import { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";

const ensureUploadDirectory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  next();
};

export { ensureUploadDirectory };
