import { PrismaClient } from "@prisma/client";
import { Application } from "express";
import cors from "cors";

import express from "express";
import expressConfig from "./config/express-config";

const app: Application = express();
const prisma = new PrismaClient();

expressConfig(app);

app.get("/", async (req, res) => {
  const user = await prisma.user.findMany();
  res.send(user);
});

app.post("/create", async (req, res) => {
  const data = await req.body;
  console.log(data);
  try {
    const createdUser = await prisma.user.create({
      data: {
        email: data?.email,
        username: data?.username,
        password: data?.password,
      },
    });
    res.send(createdUser);
  } catch (error) {
    console.log(error);
    res.end();
  }
});

app.delete("/user", async (req, res) => {
  try {
    const id = req.body?.id;

    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).end()
  } catch (error) {
    console.log(error)
    res.end();
  }
});

app.listen(3000, () => {
  console.log("Server listening to 3000");
});
