import { Application } from "express";

import express from "express";
import expressConfig from "./config/express-config";
import dbConfig from "./config/db-config";
import routesConfig from "./config/routes-config";

const app: Application = express();

start();
async function start(): Promise<void> {
  expressConfig(app);
  await dbConfig();
  routesConfig(app);

  app.listen(3001, () => {
    console.log("Server listening to 3000");
  });
}
