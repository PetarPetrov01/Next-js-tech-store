import { Application } from "express";
import authRouter from "../routes/authRouter";
import uploadRouter from "../routes/uploadRouter";

export default function routesConfig(app: Application): void {
  app.use("/api/auth", authRouter);
  app.use("/api/upload", uploadRouter);
}
