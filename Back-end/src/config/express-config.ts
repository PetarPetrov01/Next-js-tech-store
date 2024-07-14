import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import { ensureUploadDirectory } from "../middlewares/uploadDirectory";

export default function expressConfig(app: Application): void {
  app.use(
    cors({
      origin: ["http://localhost:4200", "http://localhost:3000"],
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(ensureUploadDirectory);
}
