import express, { Application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { ensureUploadDirectory } from "../middlewares/uploadDirectory";
import { logger } from "../middlewares/logger";
import session from "../middlewares/sesssion";

export default function expressConfig(app: Application): void {
  app.use(logger);
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:4200", "http://localhost:3000"],
      credentials: true
    })
  );
  app.use(session);
  app.use(ensureUploadDirectory);
}
