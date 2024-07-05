import { PrismaClient } from "@prisma/client";
import { Application } from "express";
import cors from 'cors'

import express from "express";

const app: Application = express();
const prisma = new PrismaClient();

app.use(cors())

app.get("/", async (req, res) => {
  const user = await prisma.user.findMany();
  res.send(user);
});

app.post("/create", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const createdUser = await prisma.user.create({
      data: { email, username, password },
    });
    res.send(createdUser);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server listening to 3000");
});
