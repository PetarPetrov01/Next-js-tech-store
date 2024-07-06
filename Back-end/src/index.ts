import { Application } from "express";

import express from "express";
import expressConfig from "./config/express-config";
import dbConfig from "./config/db-config";

const app: Application = express();

start()
async function start() {
  expressConfig(app);
  await dbConfig()
  
  app.listen(3000, () => {
    console.log("Server listening to 3000");
  });
}
  