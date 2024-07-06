import { Application } from "express";
import authRouter from "../routes/authRouter";

export default function routesConfig(app: Application): void {
  app.use("/api/auth", authRouter);
}
