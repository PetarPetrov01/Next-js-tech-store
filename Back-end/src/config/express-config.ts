import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";

export default function expressConfig(app: Application): void {
  app.use(
    cors({
      origin: ["http://localhost:4200", "http://localhost:3000"],
    })
  );
  app.use(express.json());
  app.use(cookieParser());
}
