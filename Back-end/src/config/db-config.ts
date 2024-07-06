import { PrismaClient } from "@prisma/client";

const globalPrismaClient = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalPrismaClient.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalPrismaClient.prisma = prisma;

export default async function dbConfig() {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (error) {
    console.error("Could not connect to database", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
