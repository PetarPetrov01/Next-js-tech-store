import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

const ensureUploadDirectory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const dir = path.join(__dirname, "..", "..","uploads");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  next();
};

export { ensureUploadDirectory };
